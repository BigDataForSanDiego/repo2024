<main>
    <section>
        <div class='responseBox'>
            <slot name="response"/>
        </div>
    </section>
</main>

<style>
    section{
		width: auto;
        height: auto;
        /* max-height: 145px; */
		display: grid;
		padding-left: 11px;
		margin-right: 11px;
        margin-left: 11px;
		padding-right: 11px;
        border-radius: 7px;
		margin-bottom: 8px;
        background: #FFFFFF;
        /* overflow: hidden; */
	}

    .responseBox {
        text-align: left;
        display: flex;
        flex-flow: column;
        align-items: top;
        justify-content: top;
        line-height: 1.5;
        padding: 15px;
    }
</style>