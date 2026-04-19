document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/api/students';

    const tableBody = document.getElementById('studentTableBody');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const noDataMsg = document.getElementById('noDataMsg');
    
    // Search & Sort Elements
    const searchInput = document.getElementById('searchInput');
    const sortBy = document.getElementById('sortBy');
    const sortOrder = document.getElementById('sortOrder');

    // Modal Elements
    const studentModal = document.getElementById('studentModal');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelModal = document.getElementById('cancelModal');
    const studentForm = document.getElementById('studentForm');
    const formErrors = document.getElementById('formErrors');
    const modalTitle = document.getElementById('modalTitle');

    // State
    let currentStudents = [];

    // Initialize
    fetchStudents();

    // Event Listeners
    searchInput.addEventListener('input', debounce(fetchStudents, 300));
    sortBy.addEventListener('change', fetchStudents);
    sortOrder.addEventListener('change', fetchStudents);

    addStudentBtn.addEventListener('click', () => {
        openModal();
    });

    closeModal.addEventListener('click', hideModal);
    cancelModal.addEventListener('click', hideModal);

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = document.getElementById('studentId').value;
        const studentData = {
            first_name: document.getElementById('firstName').value,
            last_name: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            major: document.getElementById('major').value,
            enrollment_date: document.getElementById('enrollmentDate').value,
            status: document.getElementById('status').value
        };

        if (studentId) {
            await updateStudent(studentId, studentData);
        } else {
            await createStudent(studentData);
        }
    });

    // API Functions
    async function fetchStudents() {
        showLoading(true);
        const search = searchInput.value;
        const sort = sortBy.value;
        const order = sortOrder.value;

        try {
            const response = await fetch(`${API_URL}?search=${encodeURIComponent(search)}&sortBy=${sort}&order=${order}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            currentStudents = data;
            renderTable(data);
        } catch (error) {
            console.error(error);
            // Handle error silently or show a toast
        } finally {
            showLoading(false);
        }
    }

    async function createStudent(data) {
        formErrors.textContent = '';
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            
            if (!response.ok) {
                if (result.errors) formErrors.textContent = result.errors.join(' ');
                else if (result.error) formErrors.textContent = result.error;
                return;
            }

            hideModal();
            fetchStudents();
        } catch (error) {
            console.error(error);
            formErrors.textContent = "An error occurred while saving.";
        }
    }

    async function updateStudent(id, data) {
        formErrors.textContent = '';
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            
            if (!response.ok) {
                if (result.errors) formErrors.textContent = result.errors.join(' ');
                else if (result.error) formErrors.textContent = result.error;
                return;
            }

            hideModal();
            fetchStudents();
        } catch (error) {
            console.error(error);
            formErrors.textContent = "An error occurred while updating.";
        }
    }

    async function deleteStudent(id) {
        if (!confirm('Are you sure you want to delete this student?')) return;
        
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete');
            fetchStudents();
        } catch (error) {
            console.error(error);
            alert('Failed to delete student.');
        }
    }

    // Expose delete to global scope for inline onclick handler
    window.handleDelete = deleteStudent;
    window.handleEdit = (id) => {
        const student = currentStudents.find(s => s.id === id);
        if (student) openModal(student);
    };

    // UI Functions
    function renderTable(students) {
        tableBody.innerHTML = '';
        if (students.length === 0) {
            noDataMsg.style.display = 'block';
            tableBody.parentElement.style.display = 'none';
            return;
        }

        noDataMsg.style.display = 'none';
        tableBody.parentElement.style.display = 'table';

        students.forEach(student => {
            const date = new Date(student.enrollment_date).toLocaleDateString();
            const statusClass = `status-${student.status.toLowerCase()}`;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${student.id}</td>
                <td>
                    <div style="font-weight: 600; color: var(--text-primary);">${student.first_name} ${student.last_name}</div>
                </td>
                <td>${student.email}</td>
                <td>${student.major}</td>
                <td>${date}</td>
                <td><span class="status-badge ${statusClass}">${student.status}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn edit" onclick="handleEdit(${student.id})" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete" onclick="handleDelete(${student.id})" title="Delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function openModal(student = null) {
        formErrors.textContent = '';
        if (student) {
            modalTitle.textContent = 'Edit Student';
            document.getElementById('studentId').value = student.id;
            document.getElementById('firstName').value = student.first_name;
            document.getElementById('lastName').value = student.last_name;
            document.getElementById('email').value = student.email;
            document.getElementById('major').value = student.major;
            
            // Format date for input type="date"
            const d = new Date(student.enrollment_date);
            const dateStr = d.toISOString().split('T')[0];
            document.getElementById('enrollmentDate').value = dateStr;
            
            document.getElementById('status').value = student.status;
        } else {
            modalTitle.textContent = 'Add Student';
            studentForm.reset();
            document.getElementById('studentId').value = '';
            document.getElementById('status').value = 'Active';
        }
        studentModal.classList.add('active');
    }

    function hideModal() {
        studentModal.classList.remove('active');
    }

    function showLoading(show) {
        loadingIndicator.style.display = show ? 'block' : 'none';
        if (show) tableBody.parentElement.style.display = 'none';
    }

    // Utility
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});
