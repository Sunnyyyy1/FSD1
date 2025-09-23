document.addEventListener("DOMContentLoaded", () => {
  let students = [];

  const tbody = document.querySelector("#studentTable tbody");
  const msg = document.getElementById("msg");
  const formError = document.getElementById("formError");
  const nameInput = document.getElementById("newName");
  const marksInput = document.getElementById("newMarks");

  function renderTable() {
    tbody.innerHTML = "";

    if (students.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="3" style="text-align:center; color: #888;">No students to display</td>`;
      tbody.appendChild(tr);
      return;
    }

    const highestMark = Math.max(...students.map((s) => s.marks));

    students.forEach((s, index) => {
      const tr = document.createElement("tr");
      if (s.marks === highestMark) tr.classList.add("highlight");

      tr.innerHTML = `
        <td><input type="checkbox" class="select-student" data-index="${index}" /></td>
        <td>${s.name}</td>
        <td>${s.marks}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function showHighest() {
    if (!students.length) {
      msg.textContent = "No students";
      return;
    }
    const max = students.reduce((a, b) => (a.marks > b.marks ? a : b));
    msg.textContent = `Highest: ${max.name} (${max.marks})`;
  }

  function showAverage() {
    if (!students.length) {
      msg.textContent = "No students";
      return;
    }
    const avg = students.reduce((s, x) => s + x.marks, 0) / students.length;
    msg.textContent = `Average Marks: ${avg.toFixed(2)}`;
  }

  function averageOfSelected() {
    const checkboxes = document.querySelectorAll(".select-student:checked");

    if (checkboxes.length === 0) {
      msg.textContent = "No students selected";
      return;
    }

    let total = 0;
    checkboxes.forEach((cb) => {
      const index = parseInt(cb.dataset.index, 10);
      total += students[index].marks;
    });

    const avg = total / checkboxes.length;
    msg.textContent = `Average of selected: ${avg.toFixed(2)}`;
  }

  function sortByMarks() {
    students.sort((a, b) => b.marks - a.marks);
    renderTable();
    msg.textContent = "Sorted by marks (highest → lowest)";
  }

  function removeLast() {
    if (!students.length) {
      msg.textContent = "No students to remove";
      return;
    }
    const removed = students.pop();
    renderTable();
    msg.textContent = `Removed: ${removed.name}`;
  }

  function addStudent() {
    const name = nameInput.value.trim();
    const marks = parseInt(marksInput.value, 10);

    if (!name || isNaN(marks) || marks < 0 || marks > 100) {
      formError.textContent = "Please enter a valid name and marks (0-100)";
      return;
    }

    students.push({ name, marks });
    nameInput.value = "";
    marksInput.value = "";
    formError.textContent = "";
    renderTable();
    msg.textContent = `Added: ${name}`;
  }

  function resetSample() {
    const confirmReset = confirm(
      "Are you sure you want to reset to sample data?"
    );
    if (!confirmReset) return;

    students = [
      { name: "Divya", marks: 98 },
      { name: "Karan", marks: 95 },
      { name: "Priya", marks: 92 },
      { name: "Sneha", marks: 88 },
      { name: "Amit", marks: 85 },
      { name: "Rahul", marks: 76 },
    ];
    renderTable();
    msg.textContent = "Sample data loaded";
  }

  document
    .getElementById("showHighestBtn")
    .addEventListener("click", showHighest);
  document
    .getElementById("showAverageBtn")
    .addEventListener("click", showAverage);
  document
    .getElementById("averageSelectedBtn")
    .addEventListener("click", averageOfSelected);
  document.getElementById("sortBtn").addEventListener("click", sortByMarks);
  document.getElementById("removeBtn").addEventListener("click", removeLast);
  document
    .getElementById("addStudentBtn")
    .addEventListener("click", addStudent);
  document.getElementById("resetBtn").addEventListener("click", resetSample);

  // Initial load
  resetSample();
});
