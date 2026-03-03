<script>
  import Sidebar from './components/Sidebar.svelte';
  import Topbar from './components/Topbar.svelte';
  import RoadmapDisplay from './components/RoadmapDisplay.svelte';
  import Checklist from './components/Checklist.svelte';
</script>
<div class="app">
  <Sidebar />

  <div class="main">
    <Topbar />
    <div class="content">
      <RoadmapDisplay />
      <Checklist />
    </div>
  </div>
</div>

<style>
  .app {display: flex;
    height: 100vh;
    font-family: Arial, sans-serif;
    background: #f1f5f9;
  }
 .main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .content {
    padding: 20px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }
</style>