<script>
    import { onMount } from 'svelte';
    import { run, transformTextToHtml } from './gemini-server.js';
    import ResponseBox from './ResponseBox.svelte';
  
    export let data, error, loading;
    let prompt = "";
    let isDisabled = false;

    function handleSubmit(event) {
      event.preventDefault();
      isDisabled = true;
      loadData();
      
      setTimeout(() => {
          isDisabled = false;
      }, 10_000)
    }
  
    async function loadData() {
        try {
            loading = true;
            data["Blood Glucose"] = transformTextToHtml(await run("What are standard blood glucose ranges?"));
            // data = await run("what uppp. If response is not related to blood glucose or informative, then respond with the word 'No.' else 1 sentence response that is specific, please");
            // data["Diet Tracker"] = transformTextToHtml(await run("Heres a list of food I ate in 1 serving: skittles, kale, cereal, ice cream. How will this list of food change my blood glucose. If more info is needed on type of food, then explicitly say that"));
            // data["Symptoms"] = transformTextToHtml(await run("I just ate lunch and am 80 yrs old. I have 150 mg/dL. is insomnia a symptom of blood glucose"));
            data["Diet Tracker"] = transformTextToHtml(await run("Heres a list of food I ate in 1 serving: skittles, kale, cereal, ice cream. If more info is needed on type of food, then explicitly say that."));
            data["Symptoms"] = transformTextToHtml(await run("Is insomnia a symptom of blood glucose."));
            // data["Additional notes"] = transformTextToHtml(await run("given additional notes: 'feeling ill. ate too much. excercise for 1 hours'.how this will impact blood sugar"));
            // data = transformTextToHtml(await run("Heres a list of food I ate in 1 serving: skittles, kale, cereal, ice cream. How will this list of food change my blood glucose. If more info is needed on type of food, then explicitly say that. given additional notes: 'feeling ill. ate too much. excercise for 1 hours'.how this will impact blood sugar. I just ate lunch and am 80 yrs old. I have 150 mg/dL. is insomnia a symptom of blood glucose"));
            data["Additional notes"] = transformTextToHtml(await run(prompt));
          } catch (err) {
            error = "Responses are currently unavailable. <br/> Please try again later :(";
            console.log(err)
        } finally {
            loading = false;
        }
    }
  
    onMount(() => {
        loadData();
    });
  </script>
  
  <main>  
    <div class="grid-container"> 
      <!-- Additional Notes -->
      <div class="item1">
        <form id="additional-notes"on:submit={handleSubmit}>
          <label for="prompt">
            <h3 id=heading >Additional comments and notes</h3>
            <br/>
            <textarea 
              id="prompt" 
              name="prompt" 
              rows="8" 
              bind:value={prompt} 
              placeholder="Today I felt..."
            ></textarea>
          </label>
          <br/>
          <div id="save-container">
            <button id="save" type="submit" disabled={isDisabled}>Save</button>
          </div>
        </form>
      </div>
    
      <!-- Response -->
      <div class="item2">
        <div id="ai-section-wrapper">
          <div id="ai-section">
            <h2>Ai-Powered Research</h2>
            {#if loading}
                Loading...
            {:else if error}
            <p>{@html error}</p>
            {:else if data}
              <tr style="--index: 1">
                {#if data["Blood Glucose"] != "Not related. <br>"}
                  <td id="response-box">
                        <ResponseBox>
                            <span slot="response">{@html data["Blood Glucose"]}</span>
                        </ResponseBox>
                  </td>
                  {/if}
              </tr>
              <tr style="--index: 2">
                {#if data["Diet Tracker"] != "Not related. <br>"}
                <td id="response-box">
                      <ResponseBox>
                          <span slot="response">{@html data["Diet Tracker"]}</span>
                      </ResponseBox>
                  </td>
                {/if}
              </tr>
              <tr style="--index: 3">
                {#if data["Symptoms"] != "Not related. <br>"}
                  <td id="response-box">
                      <ResponseBox>
                          <span slot="response">{@html data["Symptoms"]}</span>
                      </ResponseBox>
                  </td>
                {/if}
              </tr>
              {#if data["Additional notes"] != "Not related. <br>" && prompt != ""}
                <tr style="--index: 4">
                  <td id="response-box">
                        <ResponseBox>
                            <span slot="response">{@html data["Additional notes"]}</span>
                        </ResponseBox>
                    </td>
                </tr>
              {/if}
            {:else}
                <p>No data available.</p>
            {/if}
            <div id="subtitle-container">
              <p id="subtitle">This is meant to be purely informative. AI can make mistakes. Please check with your doctor always.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  
<style>
  #additional-notes{
    display: flex;
    flex-direction: column;
  }

  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
    padding: 0px;
  }

  .grid-container > div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
  }

  .item1 {
    grid-column-start: 1;
    grid-column-end: 3;
    padding-left: auto;
    display: flex;
    align-items: top;
    justify-content: center;
  }

  .item2 {
    grid-column-start: 3;
    grid-column-end: 4;
    display: flex;
    align-items: top;
    justify-content: center;
    padding: 0px;
    position: relative;
  }


  #ai-section-wrapper{
    width: 30vw;
    height: 98vh;
    background: #EBF4F6;
    border-radius: 12px;

    display: flex;
    align-items: top;
    justify-content: center;
    padding-top: 20px;
    overflow: hidden;
    padding: 0px;
  }

  #response-box{
    /* width: 410px; */
    padding-left: 0.5vw;
    padding-right: 0.5vw;
  }

  textarea {
    height: 10vh;
    width: 60vw;
    resize: none;
  }

  tr {
    opacity: 0;
    animation: fadeIn 1s;
    animation-delay: calc(0.5s * var(--index));
    animation-fill-mode: forwards;
    padding: 0px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  #subtitle{
    background-color: #EBF4F6;
    padding-left: 2vw;
    padding-right: 2vw;
    bottom: 0;
    width: 30vw;
  }

  #save{
    color: white;
    width: 90px;
    height: 30px;
    border-radius: 25vh;
    border: 0px;
    background-color: #18808C;
  }

  #subtitle-container {
    position: absolute;
    bottom: 0; /* Positions the text at the bottom */
    left: 0; /* Aligns the text to the left (optional) */
  }

  #save-container{
    display: flex;
    justify-content: flex-end;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  #heading{
    text-align: left;
    margin-bottom: 0px;
    padding: 0px;
  }
</style>
  