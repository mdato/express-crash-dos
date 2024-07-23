//const root ='http://localhost:8000/'
const root ='https://express-crash-dos.vercel.app/'

// Function to fetch all posts
        function getAllPosts() {
            //fetch('http://localhost:8000/posts')
            fetch(`${root}posts`)
            .then(response => response.json())
            .then(posts => {
                console.log('All posts:', posts);
                const postsList = document.getElementById('postsList');
                postsList.innerHTML = '';
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.textContent = `ID: ${post.id}, Title: ${post.title}`;
                    postsList.appendChild(postElement);
                });
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                //alert('Error fetching posts!');
                showPopup('Error fetching posts!', true);
            });
        }

        // Call getAllPosts() initially to load posts on page load
        getAllPosts();


        document.getElementById('createForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            fetch(`${root}posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            })
            //.then(response => response.json())
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('New post created:', data);
                showPopup(`New post created!`);                
                getAllPosts();
            })
            .catch(error => {
                console.error('Error creating post:', error);
                showPopup('Error creating post!', true);
            });
            clearInputs('createForm');
        });

        document.getElementById('updateForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const postId = document.getElementById('updateId').value;
            const newTitle = document.getElementById('updateTitle').value;
            //fetch(`http://localhost:8000/posts/${postId}`, {
            fetch(`${root}posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Post updated:', data);
                showPopup(`Post ${postId} updated!`);                
                getAllPosts();
            })
            .catch(error => {
                console.error('Error updating post:', error);
                showPopup('Error updating post!', true);
            });
            clearInputs('updateForm');
        });
        
        document.getElementById('deleteForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const postId = document.getElementById('deleteId').value;
            //fetch(`http://localhost:8000/posts/${postId}`, {
                fetch(`${root}posts/${postId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Post deleted:', data);
                showPopup(`Post ${postId} deleted!`);                
                getAllPosts();
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                showPopup('Error deleting post!', true);
            });
            clearInputs('deleteForm');
        });

        //document.getElementById('getAllPosts').addEventListener('click', function() {
        //    getAllPosts();
            // fetch('http://localhost:8000/posts')
            // .then(response => response.json())
            // .then(posts => {
            //     console.log('All posts:', posts);
            //     const postsList = document.getElementById('postsList');
            //     postsList.innerHTML = '';
            //     posts.forEach(post => {
            //         const postElement = document.createElement('div');
            //         postElement.textContent = `ID: ${post.id}, Title: ${post.title}`;
            //         postsList.appendChild(postElement);
            //     });
            // })
            // .catch(error => {
            //     console.error('Error fetching posts:', error);
            //     alert('Error fetching posts!');
            // });
        //});

// Función para mostrar un popup con mensaje temporal
function showPopup(message, isError = false) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.style.display = 'block';

    // Aplicar la clase 'error' si isError es true
    if (isError) {
        popup.classList.add('error');
    } else {
        popup.classList.remove('error');
    }

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000); // Ocultar el popup después de 3 segundos
}

        // Función para limpiar los campos de un formulario
        function clearInputs(formId) {
            const form = document.getElementById(formId);
            form.reset();
        }