<script lang="ts">
import { writable } from 'svelte/store'

	const points = writable(0)
	let counters = [];
	$: isASC = true;
	$: isDESC = !isASC;

	function add() {
		counters = counters.concat({ done: false, text: '', point: 0 });
	}

	function remove() {
		counters.filter(t => t.done).forEach(function(val){
			$points -= val.point;
		});
		counters = counters.filter(t => !t.done);
	}

	function clear() {
		counters = [];
		$points = 0;
	}

	function reset() {
		counters.forEach(function(val){
			val.point = 0;
			$points = 0;
		})
		counters = counters;
	}

	function sort() {
		isASC = !isASC;
		counters.sort((a, b) => {
			if (a.point < b.point){
        return isASC? -1: 1;
      }else{
        return isDESC? 1: -1;
      }
		})
		counters = counters;
	}

	$: remaining = counters.filter(t => !t.done).length;
</script>

<h1>Counter</h1>

{#each counters as counter}
	<div class:done={counter.done}>
		<input
			type=checkbox
			bind:checked={counter.done}
		>

		<input
			placeholder="What needs to be done?"
			bind:value={counter.text}
		>

		{counter.point}Point
		<button on:click={
			()=>{
				counter.point++;
				$points++;
			}
		}>
			plus
		</button>

		<button on:click={
			()=>{
				if(counter.point > 0){
					counter.point--;
					$points--;
				}
			}
		}>
			dis
		</button>

		<button on:click={
			()=>{
				$points -= counter.point;
				counter.point = 0;
			}
		}>
			reset
		</button>
	</div>
{/each}

<p>{remaining} remaining</p>

<p>all {$points}points </p> 

<button on:click={add}>
	Add new
</button>

<button on:click={remove}>
	Remove selected Counters
</button>

<button on:click={reset}>
	Reset points
</button>

<button on:click={sort}>
	Sort by point
</button>

<button on:click={clear}>
	Clear all Counters
</button>
<style>
	.done {
		opacity: 0.4;
	}
</style>
