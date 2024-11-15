<script>
  import Gemini from './Gemini.svelte';
  import NavBar from './NavBar.svelte';
  import { onMount } from 'svelte';
  import { run, transformTextToHtml } from './gemini-server.js';

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
    
    setTimeout(() => {
        isEditing = true;
    }, 10_000)
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

</script>

<main>
  <NavBar/>
  <div class="content">
    <div class="main-content-wrapper">
      <div class="main-content">
        <!-- Left Section: Daily Journal -->
        <div class="journal-section">
          <h2>
            Daily Journal - {currentDate}
            <!-- <img src="/path/to/icon.png" alt="Journal Icon" /> -->
          </h2>
    
          <!-- Blood Glucose Subsection -->
          <div class="subsection">
            <h3>Blood Glucose</h3>
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
            <button class="add-button" on:click={addBloodGlucoseRecord} disabled={!isEditing}>+</button>
          </div>
          <!-- Nutrition Tracker Subsection -->
          <div class="subsection">
            <h3>Nutrition Tracker</h3>
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
            <button class="add-button" on:click={addNutritionRecord} disabled={!isEditing}>+</button>
          </div>
    
          <!-- Symptoms Subsection -->
          <div class="subsection">
            <h3>Symptoms</h3>
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
            <h3>Additional Notes</h3>
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
          <button class="save" on:click={isEditing ? saveData : toggleEdit} disabled={!isEditing}>
            Save
          </button>
        </div>
    
        <!-- Right Section -->
        <div class="right-content">
          <!-- Right Section: Calendar -->
          <div class="calendar-section">
            <h2>
              Calendar 
              <!-- <img src="/path/to/icon.png" alt="Calendar Icon" /> -->
            </h2>
            <!-- Placeholder for calendar -->
            <div class="calendar">
              <!-- Calendar logic to show days and allow selecting a day -->
              {#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as day, index}
              <button
                class="day {new Date().getDate() === index + 1 ? 'current-day' : ''}"
                id="day-titles"
                on:click={() => changeJournalForDay(new Date().setDate(index + 1))}
              >
                {day}
              </button>
              {/each}
              {#each [0, 0] as _, index}
              <button
                class="day {new Date().getDate() === index + 1 ? 'current-day' : ''}"
                id="day-titles"
                on:click={() => changeJournalForDay(new Date().setDate(index + 1))}
              >
              </button>
              {/each}
              {#each Array(day) as _, index}
                <button
                  id="days"
                  class="day {new Date().getDate() === index + 1 ? 'current-day' : ''}"
                  on:click={() => changeJournalForDay(new Date().setDate(index + 1))}
                >
                  {index + 1}
              </button>
              {/each}
              {#each Array.from({ length: 31 - day + 1 }, (_, index) => day + 1 + index) as day_i, index}
              <button
                id="future-days"
                class="day {new Date().getDate() === index + 1 ? 'current-day' : ''}"
                on:click={() => changeJournalForDay(new Date().setDate(index + 1))}
              >
                  {day_i}
              </button>
            {/each}
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
    margin-left: 5%;
    margin-right: 5%;
    background-color: white;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
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
  }
  .subsection h3 {
    margin-bottom: 10px;
  }

  .add-button{
    width: 50px;
    border-radius: 10px;
    background-color: white;
  }

  .add-button:hover{
    background-color: rgb(192, 192, 192);
  }


  /* Right section: Calendar */
  .calendar-section {
    width: auto;
    height: auto;
    padding: 20px;
    background-color: #EBF4F6;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  /* Calendar styles */
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    margin-top: 20px;
    width: 100%;
  }
  .day {
    padding: 10px;
    text-align: center;
    border: 0px solid #ccc;
    border-radius: 100%;
    cursor: pointer;
    background-color: white;
  }

  #day-titles{
    background-color: #EBF4F6;
  }

  #future-days{
    background-color: #EBF4F6;
  }

  @media (max-width: 600px) {
    .calendar {
      grid-template-columns: repeat(4, 1fr); /* 4 columns on small screens */
    }
  }

  /* For very small screens, below 400px */
  @media (max-width: 400px) {
    .calendar {
      grid-template-columns: repeat(2, 1fr); /* 2 columns on very small screens */
    }
  }

  .current-day {
    background-color: #18808C;
    color: white;
  }

  /* Right section: Gemini */
  .gemini-section {
    padding: 20px;
    background-color: #EBF4F6;
    height: 500px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  
  /* Symptom icons */
  .symptoms-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }

  @media (max-width: 600px) {
    .symptoms-grid {
      grid-template-columns: repeat(3, 1fr); /* 4 columns on small screens */
    }
  }

  .symptom-icon {
    padding: 10px;
    border: 0px solid #007bff;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    background-color: #EBF4F6;
    /* max-width: 100px; */
  }
  .symptom-icon.active {
    background-color:#EBF4F6;
  }

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
    width: 90px;
    height: 30px;
    border-radius: 25vh;
    border: 0px;
    background-color: #18808C;
  }

  .save:hover{
    background-color: #0f6972;
  }

  .save:disabled{
    color: rgb(231, 231, 231);
    background-color: #788b8d;
  }


  h2{
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    margin: 0;
    padding: 0;
  }

  h3{
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }

  .delete{
    border: 0px;
    background-color: #EBF4F6;
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
    width: 280px;
    height: 20px;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
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


  :global(body) {
    margin: 0; 
    padding: 0; 
    box-sizing: border-box;
    background-color: #EBF4F6;
  }
</style>
