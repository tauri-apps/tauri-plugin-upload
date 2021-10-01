<script lang="ts">
	import upload from 'tauri-plugin-upload-api'
	import { open as openDialog } from '@tauri-apps/api/dialog'

	let response = ''
	let totalProgress = 0
	let total = 0

	function updateResponse(returnValue) {
		response += `[${new Date().toLocaleTimeString()}] ` + (typeof returnValue === 'string' ? returnValue : JSON.stringify(returnValue)) + '<br>'
	}

	async function _execute() {
		// wait for current one to finish
		if (totalProgress !== total) {
			return
		}
		const path = await openDialog({ multiple: false, directory: false })
		if (typeof path === 'string') {
			upload('https://jsonplaceholder.typicode.com/posts', path, (progress, t) => {
				totalProgress += progress
				total = t
				updateResponse(`Progress: ${totalProgress}, total: ${total}`)
				if (totalProgress === total) {
					totalProgress = total = 0
				}
			}).then(updateResponse).catch(e => {
				updateResponse(e)
				totalProgress = total = 0
			})
		}
	}
</script>

<div>
	<button on:click="{_execute}">Execute</button>
	<div>{@html response}</div>
</div>
