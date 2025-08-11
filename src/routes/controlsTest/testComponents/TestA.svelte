<script lang="ts">
	export type TestAProps = {
		name: string;
		description: string;
	};

	const { name, description }: TestAProps = $props();
</script>

<div class="TestA-component">
	<h2>{name}</h2>
	<div>{description}</div>
</div>
