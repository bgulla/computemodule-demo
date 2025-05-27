
# Creating your first Compute Module

## Preqs
You must have access to a `docker-registry` or [Foundry Artifact Repository](../artifact-registry.md).


## Module Creation
![Module Creation](/python/static/01_modal_create.png)

To create your compute module, give it a meaningful name and place it in the appropriate project for your organization. Remember, the compute module will inherit the permissions of the folder/project in which it resides.

![Module Placement](/python/static/01_modal_create_2.png)

## Configure Your Compute Module

### Assign a Container to the Compute Module
![Add Container](/python/static/01_add_container.png)

Select the `artifact repository` and specify the container image and tag you wish to use in your compute module.

### Set Runtime Container Settings
![Runtime Settings](/python/static/01_runtime_settings.png)

Configure runtime-specific parameters for your compute module, including:

- Environment Variables
- Arguments
- Volume Mounts
- Resource Constraints
- Readiness Probes
- Liveness Probes
- Log Format/Locations

### Connecting External Datasources
![Connect Data](/python/static/01_connect_data.png)

### Other Runtime Configurations
![Other Configs](/python/static/other_configs.png)

## Function Import

### Swagger/OpenAPI Interface
![Swagger Interface](/python/static/01_swagger.png)

This view displays our image's `Swagger`/`OpenAPI` spec interface, showcasing the exposed RESTful interface with both functions and their respective arguments.

### Automatic Function Import
![Function Screen](/python/static/01_function_screen.png)

Since we utilize an [OpenAPI](https://www.openapis.org/)-spec webserver, Foundry automatically parses the spec and imports the functions into the compute module manifest.

### Walking Functions
![](/static/01_function_walk.png)
Once functions are imported into the compute module spec, you can walk the spec to learn more about the available integrations exposed to Foundry.


## Testing Functions
![REST Test](/python/static/01_rest_test.png)

You can test the functionality of your image via a `POST` interface.
