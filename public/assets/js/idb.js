let db
const request = indexedDB.open('pizza_hunt', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result
    db.createObjectStore('new_pizza', {autoIncrement: true})
};
request.onsuccess = function(event) {
    db = event.target.result
    if (navigator.onLine) {
        // uploadPizza()
    }
};
request.onerror = event => console.log(event.target.errorCode)

function saveRecord(record) {
    const transaction = db.transaction(['new_pizza'], 'readwrite')
    const pizzaObjectStore = transaction.objectStore('new_pizza')
    pizzaObjectStore.add(record)
}

async function uploadPizza() {
    const transaction = db.transaction(['new_pizza'], 'readwrite')
    const pizzaObjectStore = transaction.objectStore('new_pizza')
    const all = pizzaObjectStore.getAll()
    all.onsuccess = async function() {
        if (all.result.length < 1) {
            return
        }
        try {
            const postStream = await fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(all.result),
                headers: {
                  Accept: 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                }
            })
            const postResponse = await postStream.json()
            if (postResponse.message) {
                throw new Error(postResponse)
            }
            const transaction = db.transaction(['new_pizza'], 'readwrite')
            // access the new_pizza object store
            const pizzaObjectStore = transaction.objectStore('new_pizza')
            // clear all items in your store
            pizzaObjectStore.clear()
            alert('All saved pizza has been submitted!');
        }
        catch(err) {
            console.log(err)
        }
    }
}

window.addEventListener('online', uploadPizza)