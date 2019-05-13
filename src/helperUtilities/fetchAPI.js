// Handle submission of form. Featch API to get NASA data, then store it in Redux store
export default function handleSubmit(url) {
  return fetch(url)
    .then(res => res.json())
    .then(
      result => {
        return result.collection.items;
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        console.log(error);
        alert("Something went wrong. Please try again!");
        return "";
      }
    );
}
