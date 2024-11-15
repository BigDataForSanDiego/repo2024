<script>
    import ResponseBox from './ResponseBox.svelte';
    export let data, error, loading;
</script>
  
<main>  
    <div class="ai-research"> 
        <h2>AI-Powered Research</h2><br>
        <div class="gemini-wrapper">
            {#if loading}
                Loading...
            {:else if error}
            <p>{@html error}</p>
            {:else if data}
            <tr style="--index: 1">
                {#if data["Blood Glucose"] && data["Blood Glucose"] != "Not related. <br>"}
                <td id="response-box">
                    <ResponseBox>
                        <span slot="response">{@html data["Blood Glucose"]}</span>
                    </ResponseBox>
                </td>
                {/if}
            </tr>
            <tr style="--index: 2">
                {#if data["Diet Tracker"]  && data["Diet Tracker"] != "Not related. <br>"}
                <td id="response-box">
                    <ResponseBox>
                        <span slot="response">{@html data["Diet Tracker"]}</span>
                    </ResponseBox>
                </td>
                {/if}
            </tr>
            <tr style="--index: 3">
                {#if data["Symptoms"] && data["Symptoms"] != "Not related. <br>"}
                <td id="response-box">
                    <ResponseBox>
                        <span slot="response">{@html data["Symptoms"]}</span>
                    </ResponseBox>
                </td>
                {/if}
            </tr>
            {#if data["Additional notes"] && data["Additional notes"] != "Not related. <br>" && prompt != ""}
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
        </div>
        <div id="subtitle">These statements are for informational purposes only and are not a substitute for professional medical advice. You should always consult your doctor or other qualified healthcare provider with any questions you may have regarding a medical condition, procedure, or treatment.</div>
    </div>
</main>
  
<style>  

  .ai-research{
    max-height: 1500px;
    overflow: hidden;
}

  .gemini-wrapper{
    max-height: 1000px;
    overflow-y: auto;
    /* overflow: hidden; */
    height: 100%;
  }
  h2{
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
    margin: 0;
    padding: 0;
  }

  #response-box{
    width: auto;
    /* padding-left: 0.5vw;
    padding-right: 0.5vw; */
  }

  tr {
    width: 100%;
    max-width: auto;
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
    margin-top: 5px;
    font-size: 10px;
    text-align: center;
  }

  /* .title{
    margin-top: 0;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
  } */


  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>