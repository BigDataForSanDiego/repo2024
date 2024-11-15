<script>
</script>

<main>
    <nav>
        <div class="container">
            <ul>
            <!-- <h1 class="menu-heading">
                TheJams
            </h1> -->
            <div class="menu-heading">
                <img 
                    src="jams-logo.png" 
                    alt="The Jams" 
                    title="The Jams" 
                    width="90px"
                />
            </div>

            <li id="icons">
                <a href="https://github.com/BigDataForSanDiego/Team-109" target="_blank">
                <img 
                    src="github-mark.png" 
                    alt="GitHub Repo" 
                    title="GitHub Repo" 
                    width="35px"
                />
                </a>
            </li>
            <li id="icons">
                <a href="https://www.figma.com/proto/D13s6Hjw4maD0HI3U2zQPv/Project?node-id=129-179&node-type=frame&t=0Rr8QU4YqYEHmrpO-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=129%3A179" target="_blank">
                <img 
                    src="Figma-logo.png" 
                    alt="Figma" 
                    title="Figma Demo"
                    width="32px"/>
                </a>
            </li>
            </ul>
        </div>
    </nav>
</main>

<style>
    .container{
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    nav {
        display: flex;
        border-bottom: 0.1px solid rgba(0, 0, 0, 0.3);
        position: fixed;
        background-color: #FFFFFF;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
    } 

    li{
        margin: auto;
    }

    ul {
        display: flex;
        margin-top: 0px;
        margin-bottom: 0px;
        padding-left: 2.5vw;
        list-style: none;
        align-items: center;
        justify-content: center;
        height: 65px;
    }


    #icons{
        width:65px;
    }

    .menu-heading{
        font-size: 40px;
        margin: 0px;
        width: 85vw;
        display: flex;
    }
  
</style>