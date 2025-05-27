## Python-based Compute Module

## Create the Compute Module in Foundry
### Module Creation
![](/python/static/01_modal_create.png)
Name your compute module and place it in the project needed for your organization. Note: the compute module will inherit the permissions of the folder/project in which it resides. 

![](/python/static/01_modal_create_2.png)


## Configure your Compute Module
![](/python/static/01_nosetup.png)


### Assign a container to the Compute Module
![](/python/static/01_add_container.png)

Here you will select the `artifact repository` and specific container image and tag that you wish to use in your compute module. 


### Set runtime container settings
![](/python/static/01_runtime_settings.png)

Here you can configure runtime specific parameters to your compute module. 

Including:
* Environment Variables
* Arguments
* Voume Mounts
* Resource Constraints
* Readiness Probes
* Liveness Probes
* Log format/locations


### Connecting External Datasources
![](/python/static/01_connect_data.png)


### Other Runtime Configurations
![](/python/static/other_configs.png)


### Function Import

![](/python/static/01_swagger.png)

This is the `docker run ..` view of our image that showcases our `Swagger`/`OpenAPI` spec interface. As you can see here, the restful interface is exposed with both the functions and their respective arguments.  


![](/python/static/01_function_screen.png)

Because we are utilizing a [OpenAPI](https://www.openapis.org/)-spec webserver, Foundry will automatically parse the spec and import the functions into the compute module manifest. 


### Testing Functions 
![](/python/static/01_rest_test.png)
Once the functions are imported into the compute module spec, you are able to test the functionality of your image via a `POST` interface .

