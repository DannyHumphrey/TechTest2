To run add a .env file with the key 'SUBSCRIPTION_KEY=<api-key>'

run 'npm i' to install dependancies

run 'npm run dev' to run the proct

run 'run test' to run the unit tests


Notes: 

- I've done the health check test
- I've built this using Nextjs/React. I would normally use a .net api on the backend, however for bevity and speed I just built the whole thing with NextJs
- I've not built the 'question' config however, I did give it some thought
    - I would change the way I have built the question logic and move it to the backend server. I would then have the question config driven by a dynamic json configuration
    - This would allow the json config to be stored in a datastore and updated without having to deploy the application agian
    - This new endpoint would then return the status message, rarther than the UI being in control of this
