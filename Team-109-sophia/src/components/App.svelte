<script>
  import Gemini from './Gemini.svelte';

  let data = {};
  let error = null;
  let loading = true;

  import { onMount } from 'svelte';

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
      hunger: false
    },
    additionalNotes: ""
  };

  let isEditing = true;
  let selectedDate = new Date();
  let currentDate = new Date().toLocaleDateString();

  // Function to handle saving all data
  function saveData() {
    isEditing = false; // Disable all input fields, text boxes, and symptom toggles
    console.log(journalData);
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
  }

  // Function to add nutrition record
  function addNutritionRecord() {
    journalData.nutrition.push('');
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
</script>

<main>
<Gemini {data} {error} {loading}/>
<!-- Horizontal Menu Bar -->
<nav class="menu-bar">
  <ul>
    <li>Home</li>
    <li>Daily Journal</li>
    <li>Reports</li>
    <li>Settings</li>
  </ul>
</nav>

<div class="main-content">
  <!-- Left Section: Daily Journal -->
  <div class="journal-section">
    <h2>
      Daily Journal 
      <img src="/path/to/icon.png" alt="Journal Icon" />
    </h2>

    <!-- Blood Glucose Subsection -->
    <div class="subsection">
      <h3>Blood Glucose</h3>
      <button on:click={addBloodGlucoseRecord} disabled={!isEditing}>Add Record</button>
      {#each journalData.bloodGlucose as record, index}
        <div class="record">
          <input
            type="time"
            bind:value={record.time}
            disabled={!isEditing}
          />
          <input
            type="number"
            bind:value={record.level}
            placeholder="Blood glucose level (mg/dL)"
            disabled={!isEditing}
          />
          {#if isEditing}
            <button on:click={() => journalData.bloodGlucose.splice(index, 1)}>Delete</button>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Nutrition Tracker Subsection -->
    <div class="subsection">
      <h3>Nutrition Tracker</h3>
      <button on:click={addNutritionRecord} disabled={!isEditing}>Add Record</button>
      {#each journalData.nutrition as food, index}
        <div class="record">
          <input
            type="text"
            bind:value={food}
            placeholder="Enter food"
            disabled={!isEditing}
          />
          {#if isEditing}
            <button on:click={() => journalData.nutrition.splice(index, 1)}>Delete</button>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Symptoms Subsection -->
    <div class="subsection">
      <h3>Symptoms</h3>
      <div class="symptoms-grid">
        {#each Object.keys(journalData.symptoms) as symptom}
          <div
            class="symptom-icon {journalData.symptoms[symptom] ? 'active' : ''}"
            on:click={() => toggleSymptom(symptom)}
            disabled={!isEditing}
          >
            <span>{symptom}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Additional Notes Subsection -->
    <div class="subsection">
      <h3>Additional Notes</h3>
      <textarea
        bind:value={journalData.additionalNotes}
        placeholder="Type any additional notes here"
        disabled={!isEditing}
      ></textarea>
    </div>

    <!-- Save/Edit Button -->
    <button on:click={isEditing ? saveData : toggleEdit}>
      {isEditing ? 'Save' : 'Edit'}
    </button>
  </div>

  <!-- Right Section: Calendar -->
  <div class="calendar-section">
    <h2>
      Calendar 
      <img src="/path/to/icon.png" alt="Calendar Icon" />
    </h2>
    <!-- Placeholder for calendar -->
    <div class="calendar">
      <!-- Calendar logic to show days and allow selecting a day -->
      {#each Array(30) as _, index}
        <div
          class="day {new Date().getDate() === index + 1 ? 'current-day' : ''}"
          on:click={() => changeJournalForDay(new Date().setDate(index + 1))}
        >
          {index + 1}
        </div>
      {/each}
    </div>
  </div>
</div>
</main>

<style>
  /* Style for the menu bar */
  .menu-bar {
    background-color: white;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .menu-bar ul {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
  .menu-bar li {
    cursor: pointer;
  }

  /* Layout for main content */
  .main-content {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  /* Left section: Daily Journal */
  .journal-section {
    width: 60%;
    border-right: 1px solid #ccc;
  }
  .subsection {
    margin-bottom: 20px;
  }
  .subsection h3 {
    margin-bottom: 10px;
  }

  /* Right section: Calendar */
  .calendar-section {
    width: 35%;
  }

  /* Calendar styles */
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    margin-top: 20px;
  }
  .day {
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .current-day {
    background-color: #007bff;
    color: white;
  }

  /* Symptom icons */
  .symptoms-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .symptom-icon {
    padding: 10px;
    border: 1px solid #007bff;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }
  .symptom-icon.active {
    background-color: #007bff;
    color: white;
  }

  /* Save/Edit button */
  button {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
