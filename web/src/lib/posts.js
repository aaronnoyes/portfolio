const URL = 'http://localhost';
const PORT = '80';
const API = URL + ':' + PORT + '/api/';

function getPostName(c) {
  return c.split('\n')[0].replace(new RegExp('#\\s+'), '');
}

export function getPost(id) {
  return (
    fetch(API + 'blogposts/' + id, {
      method: 'GET'
    }).then(response => response.json())
  );
}

export function getAllPosts() {
  return (
    fetch(API + 'blogposts/', {
      method: 'GET'
    }).then(response => response.json())
  );
}

export function newPost(c, token) {

  let postName = getPostName(c);
  console.log(token)

  return (
    fetch(API + 'blogposts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
	      'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({contents: c, name: postName})
    })
  );
}

export function updatePost(post, contents, token) {
  let postName = getPostName(contents);
  post.name = postName;
  post.contents = contents;
  return (
    fetch(API + 'blogposts/' + post.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
	'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(post)
    })
  );
}
