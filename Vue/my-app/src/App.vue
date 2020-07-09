<template>
  <div id="app">
    <div
      v-for="(taskText, index) in taskList"
      class="flex"
      v-bind:key="index + 1"
    >
      <div>{{ index + 1 }}. {{ taskText }}</div>
      <input
        type="checkbox"
        v-bind:key="taskText"
        @change="handleChosenTask($event, taskText)"
      />
    </div>
    <div class="flex">
      <input ref="newTaskValue" />
      <button @click="addNewTask">Добавить</button>
    </div>
    <button @click="removeChosenTasks" :disabled="!chosenTasks.length">
      Удалить
    </button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      taskList: [],
      chosenTasks: [],
    };
  },
  created() {
    fetch("https://kodaktor.ru/j/tasklist")
      .then((data) => data.json())
      .then((result) => (this.taskList = result.list));
  },
  methods: {
    addNewTask() {
      const newTaskValue = this.$refs.newTaskValue.value;
      console.log(newTaskValue, !newTaskValue);
      if (!this.taskList.includes(newTaskValue) && newTaskValue) {
        this.taskList = [...this.taskList, newTaskValue];
      }
    },
    removeChosenTasks() {
      const filteredTaskList = this.taskList.filter(
        (el) => !this.chosenTasks.includes(el)
      );
      this.taskList = [...filteredTaskList];
      this.chosenTasks = [];
    },
    handleChosenTask(e, taskText) {
      if (e.target.checked) {
        this.chosenTasks = [...this.chosenTasks, taskText];
      } else {
        const newChosenTasks = [...this.chosenTasks].filter(
          (el) => el !== taskText
        );
        this.chosenTasks = newChosenTasks;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flex {
  display: flex;
}
</style>
