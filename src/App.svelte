<script lang="ts">
	import {Counter} from './counter';
  import { scale } from 'svelte/transition';

	//List of counter
	let CounterArray: Counter[] = []
	
	//Create counter
  	const CreateCounter = (input) => {
		let counter = new Counter(input.value);
    input.value = "";
		CounterArray.push(counter);
		CounterArray = CounterArray;
	}
	//Delate counter
	const DelateCounter = (index :number) => {
		CounterArray[index].reset();
		CounterArray = CounterArray.filter((_, i) => i !== index);
	}
	//Add points
	const Add = (obj :Counter) => {
		obj.add();
		CounterArray = CounterArray;
	}
	//Substruction points
	const Sub = (obj :Counter) => {
		obj.sub();
		CounterArray = CounterArray;
	}
	//Reset points
	const Reset = (obj :Counter) => {
		obj.reset();
		CounterArray = CounterArray;
	}
	//Rename
	const Rename = (obj :Counter, input) => {
		obj.rename(input.value);
		CounterArray = CounterArray;
	}
  //Sort
  const SortCounter = () => {
    CounterArray = CounterArray.sort((a: Counter, b: Counter) => {
      if (a.point < b.point){
        return 1;
      }else{
        return -1;
      }
    });
  }
</script>

<main>
	<h1>Counter</h1>
  <!-- Input form -->
	<input
  placeholder="Input Name & Enter !"
  on:keydown={e => e.key === 'Enter' && CreateCounter(e.target)}>
	
	{#each CounterArray as task, index}
    {#if index === 0}
			<h3>合計ポイント{task.sum()} points
        <button on:click={() => SortCounter()}>Sort</button>
      </h3>
		{/if}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    {#key task.name}
    <!-- Counter -->
    <section transition:scale="{{delay: 200, duration: 1000}}" class="counter">
      <ul>
        <h2><input value={task.name}
          placeholder="Input Name & Enter !"
          on:keydown={e => e.key === 'Enter' && Rename(task, e.target)}
          class = "name"> 
          {task.point} point
        </h2>
        <button class="btn btn--orange btn--radius" on:click={() => Add(task)}> ＋ </button>
        {#if task.point > 0}
        <button class="btn btn--blue btn--radius" on:click={() => Sub(task)}> ー </button>
        {/if}
        <button class="btn btn--yellow btn--radius" on:click={() => Reset(task)}>reset</button>
        <button on:click={() => DelateCounter(index)}>Remove</button>
      </ul>
    </section>
    {/key}
    <p></p>
	{/each}
	 
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

  .counter {
    text-align: center;
    padding: 1em;
    max-width: 540px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgb(68, 159, 172);
  }

  .name {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    width:100%;
  }

	.btn--orange,
	a.btn--orange {
	color: #fff;
	background-color: #eb6100;
	}
	.btn--orange:hover,
	a.btn--orange:hover {
	color: #fff;
	background: #f56500;
	}

	.btn--blue,
	a.btn--blue {
	color: #fff;
	background-color: #005ef5;
	}
	.btn--bule:hover,
	a.btn--blue:hover {
	color: #fff;
	background: #0019f5;
	}

	.btn--yellow,
	a.btn--yellow {
	color: #fff;
	background-color: #3df500;
	}
	.btn--yellow:hover,
	a.btn--yellow:hover {
	color: #fff;
	background: #31f500;
	}

	a.btn--radius {
	border-radius: 100vh;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
