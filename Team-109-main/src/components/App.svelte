<script>
  import Gemini from './Gemini.svelte';
  import NavBar from './NavBar.svelte';
  import { onMount } from 'svelte';
  import { run, transformTextToHtml } from './gemini-server.js';
  import jsPDF from 'jspdf';

  let data = {};
  let error = null;
  let loading = true;
  let isEditing = true;
  let selectedDate = new Date();
  let currentDate = new Date().toLocaleDateString();
  let isDisabled = false;
  let symptoms = "";
  let foods = "";
  let readings = "";
  let day=new Date().getDate();
  let monthName = new Date().toLocaleDateString('en-US', { month: 'long' });

  // Default data structure for user inputs
  let journalData = {
    bloodGlucose: [],
    nutrition: [],
    symptoms: {
      shaking: false,
      sweating: false,
      anxiety: false,
      irritability: false,
      dizziness: false,
      hunger: false,
      'thirsty': false,
      'tiredness': false,
      headaches: false,
      'urinating often': false,
      'blurred vision': false,
    },
    additionalNotes: ""
  };

  // Function to handle saving all data
  function saveData() {
    isEditing = false; // Disable all input fields, text boxes, and symptom toggles
    isDisabled = true;
    loadData();
    
    // setTimeout(() => {
    //     isEditing = true;
    // }, 10_000)
  }
  // Function to toggle edit mode
  function toggleEdit() {
    isEditing = !isEditing;
  }
  // Function to handle adding blood glucose record
  function addBloodGlucoseRecord() {
    let newRecord = {
      time: new Date().toLocaleTimeString(), 
      level: ''
    };
    journalData.bloodGlucose.push(newRecord);
    journalData.bloodGlucose = journalData.bloodGlucose
  }
  // Function to delete blood glucose record
    function deleteBloodGlucoseRecord(index) {
    journalData.bloodGlucose.splice(index, 1);
    journalData.bloodGlucose = journalData.bloodGlucose;
  }
  // Function to add nutrition record
  function addNutritionRecord() {
    journalData.nutrition.push('');
    journalData.nutrition = journalData.nutrition;
  }
  // Function to delete nutrition record
  function deleteNutritionRecord(index) {
    journalData.nutrition.splice(index, 1);
    journalData.nutrition = journalData.nutrition;
  }
  // Function to toggle symptom status
  function toggleSymptom(symptom) {
    journalData.symptoms[symptom] = !journalData.symptoms[symptom];
  }

  // Function to make calendar reflect the current month
  function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate(); // Returns number of days in the given month
  }

  function renderCalendar() {
    let currentMonth = selectedDate.getMonth();
    let currentYear = selectedDate.getFullYear();
    let daysInMonth = getDaysInMonth(currentYear, currentMonth);
    
    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  }

  // Change the journal data based on the selected calendar day
  function changeJournalForDay(date) {
    selectedDate = date;
    // Logic to load specific day's journalData
  }
  
  async function loadData() {
    try {
        symptoms = Object.keys(journalData.symptoms).filter(key => journalData.symptoms[key]).join(', ');
        foods = journalData.nutrition.join(', ');
        readings = journalData.bloodGlucose.map(item => `${item.level} mg/dl`).join(', ');
        loading = true;
        data = {};

        // Blood Glucose
        data["Blood Glucose"] = transformTextToHtml(await run(`Is having blood glucose levels of ${readings} within normal range for an individual of 5'2, 120lbs, and 21`));
        // Diet
        if (typeof foods === 'string' && foods.length > 0){
          data["Diet Tracker"] = transformTextToHtml(await run(`Heres a list of food I ate in 1 serving: ${foods}. If more info is needed on type of food, then explicitly say that.`));
        }
        // Symptoms
        if (typeof symptoms === 'string' && symptoms.length > 0){
          data["Symptoms"] = transformTextToHtml(await run(`Here is a list of symptoms i have: ${symptoms}. How do these relate to blood glucose?`));
        }
        // Additional notes
        if (typeof data["Additional notes"] === 'string' && data["Additional notes"].length > 0){
          data["Additional notes"] = transformTextToHtml(await run(`here is an additional note:${journalData.additionalNotes}. How does this relate to blood glucose?`));
        }
      } catch (err) {
        error = "Responses are currently unavailable. <br/> Please try again later :(";
        console.log(err)
    } finally {
        loading = false;
    }
    console.log(data["Additional notes"])
  }
  
  onMount(() => {
      loadData();
  });

  // Function to export as PDF
  function exportAsPDF() {
    const doc = new jsPDF();

    // Set font and title
    doc.setFont("Montserrat", "bold");
    doc.setFontSize(18);
    doc.text("Daily Health Tracker", 10, 10);

    // Add the date
    doc.setFont("Montserrat", "normal");
    doc.setFontSize(12);
    doc.text(`Date: ${selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 10, 20);

    // Blood Glucose Section
    doc.setFont("Montserrat", "bold");
    doc.setFontSize(14);
    doc.text("Blood Glucose Records:", 10, 30);
    doc.setFont("Montserrat", "normal");
    journalData.bloodGlucose.forEach((record, index) => {
      doc.text(`Time: ${record.time}, Level: ${record.level} mg/dL`, 10, 40 + index * 10);
    });

    // Nutrition Section
    doc.setFont("Montserrat", "bold");
    doc.setFontSize(14);
    doc.text("Nutrition Records:", 10, 70);
    doc.setFont("Montserrat", "normal");
    journalData.nutrition.forEach((food, index) => {
      doc.text(`Food: ${food}`, 10, 80 + index * 10);
    });

    // Symptoms Section
    doc.setFont("Montserrat", "bold");
    doc.setFontSize(14);
    doc.text("Symptoms:", 10, 110);
    const symptomsList = Object.keys(journalData.symptoms).filter(symptom => journalData.symptoms[symptom]).join(', ');
    doc.setFont("Montserrat", "normal");
    doc.text(`Symptoms: ${symptomsList}`, 10, 120);

    // Additional Notes Section
    doc.setFont("Montserrat", "bold");
    doc.setFontSize(14);
    doc.text("Additional Notes:", 10, 140);
    doc.setFont("Montserrat", "normal");
    doc.text(journalData.additionalNotes, 10, 150);

    // Save the PDF
    doc.save("Health_Tracker.pdf");
  }




</script>

<main>
  <NavBar/>
  <div class="content">
    <div class="main-content-wrapper">
      <div class="main-content">
        <!-- Left Section: Daily Journal -->
        <div class="journal-section">
          <div class = "top">
            <h2>Daily Journal</h2>
            {#if !isEditing}
            <button class="export" on:click={exportAsPDF}>
              Export as PDF
            </button>
            {/if}
          </div>
          <br>
          <p style="margin-top: 0; font-weight: normal;">
            📅 Today, {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
    
          <!-- Blood Glucose Subsection -->
          <div class="subsection">
            <h3>
              <img src="section-icons/glucometer.png" alt="icon" style="width: 40px; vertical-align: middle; margin-right: 8px;" />
              Blood Glucose
            </h3>
            <div class="glucose-labels">
              <span>Time</span>
              <span>Level (mg/dL)</span>
            </div>
            {#each journalData.bloodGlucose as record, index}
              <div class="record">
                <input
                  type="time"
                  class="time"
                  bind:value={record.time}
                  disabled={!isEditing}
                />
                <input
                  type="number"
                  class="input"
                  min="0"
                  bind:value={record.level}
                  placeholder="(mg/dL)"
                  disabled={!isEditing}
                />
                {#if isEditing}
                  <button class="delete" on:click={() => deleteBloodGlucoseRecord(index)}>
                    <img 
                        src='delete-icon.png'
                        alt='delete'
                        width="12px"
                    />                  
                  </button>
                {/if}
              </div>
            {/each}
            {#if journalData.bloodGlucose.length === 0}
              <p style="color: grey;">No records today</p>
            {/if}
            <button class="add-button" on:click={addBloodGlucoseRecord} disabled={!isEditing}>+</button>
          </div>
          <!-- Nutrition Tracker Subsection -->
          <div class="subsection">
            <h3>
              <img src="section-icons/diet.png" alt="icon" style="width: 40px; vertical-align: middle; margin-right: 8px;" />
              Nutrition Tracker
            </h3>
            {#each journalData.nutrition as food, index}
              <div class="record">
                <input
                  type="text"
                  class="input-food"
                  bind:value={food}
                  placeholder="Enter food"
                  disabled={!isEditing}
                />
                {#if isEditing}
                  <button class="delete" on:click={() => deleteNutritionRecord(index)}>
                    <img 
                        src='delete-icon.png'
                        alt='delete'
                        width="12px"
                    />                  
                  </button>
                {/if}
              </div>
            {/each}
            {#if journalData.nutrition.length === 0}
              <p style="color: grey;">No records today</p>
            {/if}
            <button class="add-button" on:click={addNutritionRecord} disabled={!isEditing}>+</button>
          </div>
    
          <!-- Symptoms Subsection -->
          <div class="subsection">
            <h3>
              <img src="section-icons/plan.png" alt="icon" style="width: 40px; vertical-align: middle; margin-right: 8px;" />
              Symptoms
            </h3>
            Select the symptoms you are experiencing.
            <div class="symptoms-grid">
              {#each Object.keys(journalData.symptoms) as symptom}
                <button
                  class="symptom-icon {journalData.symptoms[symptom] ? 'active' : ''}"
                  on:click={() => toggleSymptom(symptom)}
                  disabled={!isEditing}
                >
                <img 
                    src='symptom-icons/{symptom} symptom {journalData.symptoms[symptom] ? '(chosen)' : '(not chosen)'}.png'
                    alt='{symptom}'
                    width="60px"
                />
                <br/>
                  <span>{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</span>
            </button>
              {/each}
            </div>
          </div>
    
          <!-- Additional Notes Subsection -->
          <div class="subsection">
            <h3>
              <img src="section-icons/clipboard.png" alt="icon" style="width: 40px; vertical-align: middle; margin-right: 8px;" />
              Additional Notes
            </h3>
            <textarea
              bind:value={journalData.additionalNotes}
              placeholder="Type any additional notes here."
              disabled={!isEditing}
              id="prompt" 
              name="prompt" 
              rows="6" 
            ></textarea>
          </div>
          
          <!-- Save/Edit Button -->
          <button class="save" on:click={isEditing ? saveData : toggleEdit}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
    
        <!-- Right Section -->
        <div class="right-content">
          <!-- Right Section: Calendar -->
          <div class="calendar-section">
            <h2>
              Calendar 
              <!-- <img src="/path/to/icon.png" alt="Calendar Icon" /> -->
            </h2><br>
            <div class="subsection">
            <h3>{monthName}</h3>
            <div class="calendar">
              <!-- Days of the week -->
              {#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as day, index}
                <button class="day-titles">{day}</button>
              {/each}
              {#each [29,30] as day, index}
                <button class="past-month"></button>
              {/each}

            
              <!-- Calendar days -->
              {#each renderCalendar() as day}
                <button class="day {day < new Date().getDate() ? 'past-day' : day === new Date().getDate() ? 'current-day' : 'future-day'}">
                  {day}
                </button>
              {/each}
            </div>
          </div>
        </div>
          <!-- Right Section: Gemini -->
          <div class="gemini-section">
            <Gemini {data} {error} {loading}/>
          </div>
        </div>
      </div>  
    </div>
  </div>

</main>

<style>
  .content{
    /* margin-left: 5%;
    margin-right: 5%; */
    background-color: white;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  span{
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  .main-content-wrapper{
    padding: 20px;
    padding-top: 85px;
    margin-left: 2%;
    margin-right: 2%;
  }

  @media (min-width: 925px) {
    .main-content {
      display: grid;
      grid-template-columns: 2fr 1fr;;
      gap: 10px;
      padding: 20px;
      border-radius: 10px;
    }
  }

  /* Left section: Daily Journal */
  .journal-section {
    width: auto;
    padding: 20px;
    background-color: #EBF4F6;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  .subsection {
    margin-bottom: 40px;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
  }
  .subsection h3 {
    margin-bottom: 10px;
  }
  .calendar-section h3 {
    text-align: center;
  }
  .add-button {
  background-color: #fff; /* Blue color */
  border: 1px solid #18808C;
  color: #18808C;
  width: 50px;
  height: 30px;
  border-radius: 25vh;
  }

  .add-button:hover{
    background-color: #18808C; /* Blue color */
    border: 1px solid #18808C;
    color: white;
  }

  .add-button:disabled {
    color: #788b8d;
    background-color: rgb(231, 231, 231);
    border: 1px solid rgb(231, 231, 231);
    cursor: not-allowed;
  }

  input:disabled, button:disabled, textarea:disabled {
    cursor: not-allowed;
  }
  /* Right section: Calendar */
  .calendar-section {
    width: auto;
    padding: 20px;
    background-color: #EBF4F6;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  /* Calendar styles */
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    width: 100%;
  }
  .day {
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%; /* Makes the button circular */
    cursor: pointer;
    background-color: white;
    display: inline-block;
    border: 0px solid #ccc;
    line-height: 40px; /* Centers text vertically */
  }

  .day-titles{
    font-weight: 600;
    background-color: transparent;
    border: 0px solid #ccc;
  }

  .past-day {
    background-color: #EBF4F6;
    color: black;
  }

  .current-day {
    background-color: #18808C; /* Blue background */
    color: white;
  }

  .future-day {
    background-color: transparent;
    color: black;
  }


  .current-day {
    background-color: #18808C;
    color: white;
  }

  /* Right section: Gemini */
  .gemini-section {
    padding: 20px;
    background-color: #EBF4F6;
    height: 1000px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  
  /* Symptom icons */
  .symptoms-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    text-align: center;
  }

  @media (max-width: 600px) {
    .symptoms-grid {
      grid-template-columns: repeat(3, 1fr); /* 4 columns on small screens */
    }
    .content {
      background-color: #EBF4F6; /* Change background to blue */
    }
  }
  @media (max-width: 500px) {
    .symptom-icon {
      width: 40px;
      font-size: x-small;
      text-align: center;
    }
    .day {
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
    }
  }
  .symptom-icon {
    padding: 10px;
    border: 0px solid #007bff;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    /* max-width: 100px; */
  }
  .symptom-icon span {
    text-align: center;
  }
  /* .symptom-icon.active {
    background-color:#EBF4F6;
  } */

  /* Additional Notes */
  #prompt{
    /* min-width: 300px; */
    height: 10%;
    width: 98%;
    resize: none;
    border: 0px;
    padding: 5px;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    background-color: white;
  }

  /* Save */
  .save{
    color: white;
    width: auto;
    height: 30px;
    border-radius: 25vh;
    border: 1px solid #18808C;
    background-color: #18808C;
    padding-left: 20px;
    padding-right: 20px;
  }

  .save:hover{
    background-color: white;
    color: #0f6972;
  }

  .save:disabled{
    color: rgb(231, 231, 231);
    background-color: #788b8d;
  }

  .export{
    padding-left: 20px;
    padding-right: 20px;
    color: white;
    width: auto;
    height: 30px;
    border-radius: 25vh;
    background-color: white;
    color: #0f6972;
    border: 1px solid #18808C;
    
  }

  .export:hover{
    background-color: #18808C;
    color: white;
  }

  .export:disabled{
    color: rgb(231, 231, 231);
    background-color: #788b8d;
  }

  h2{
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
    margin: 0;
    padding: 0;
  }

  h3{
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    color:#18808C;
  }

  .delete{
    border: 0px;
    background-color: #fff;
  }

  .input{
    margin-bottom: 10px;
    width: 80px;
    height: 20px;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }

  .input-food{
    margin-bottom: 10px;
    width: 190px;
    height: 20px;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }

  .glucose-labels {
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
  }
  .glucose-labels span {
    font-weight: 600;
    font-size: 0.9rem;
    margin-right: 72px;;
  }
  .time{
    margin-bottom: 10px;
    width: 100px;
    height: 21px;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }
  .past-month {
    border: 0px;
    background-color: transparent;
    color: transparent;
  }
  :global(body) {
    margin: 0; 
    padding: 0; 
    box-sizing: border-box;
    background-color: #ffffff;
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
</style>
