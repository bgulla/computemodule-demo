# Foundry Artifact Registry
## Prereqs/Notes
* In Foundry terms, `docker registry` == `artifact repository`. While `artifact repositories` can host several different pkg formats (`OCI`, `JARs`, `RPMs`, etc), the hosting interface within Foundry is the same.

## Setting up a new OCI/Docker Registry
1) Within the main Foundry interface, click `Files -> New` and search `Artifacts`. 
![new-artifacts](/python/static/00_registry_new.png)
2) Select `+ New Artifact Repository` 
![](/python/static/00_new_registry_click.png)
3) Create the artifact repository instance. This process is similar to the `New Project Creation` process within foundry. The artifact repository will live within your Foundry namespace and will allow you to assign permissions similar to any other Foundry asset. If your foundry instance has CBAC enabled, you will need to assign a top-level classification for the instance as well. 
![](/python/static/00_artifact_dialog.png)
4) Now that the `artifact repository` has been created, you are presented with an interactive screen to assist you in pushing new artifacts. As you can see, the artifact repository allows you to push multiple different artifact types and will provide you with examples for each one. 
![](/python/static/00_token_creation.png)
5) Push a new artifact (in this example a Docker container image) with the following steps. Note: the `<foundry_instance>` placeholder will need to be updated to match your environment.

```bash
## build your docker image
docker build --platform linux/amd64 -t <foundry_instance>.washington.palantircloud.com/computemodule-example:python-0.0.1 .

## Log into the foundry/artifact instance
export REPOSITORY=ri.artifacts.main.repository.1179fb0c-e532-449a-b540-2f7f7f4e25b7
export TOKEN=<redacted>
docker login -u "$REPOSITORY" -p "$TOKEN" <foundry_instance>.washington.palantircloud.com

## Push your docker image into the artifact repository
docker push --platform=linux/amd64 <foundry_instance>.washington.palantircloud.com/computemodule-example:python-0.0.1
```

6) View your artifact within the Artifact Repository Explorer
![](/python/static/00_registry_splash.png)

7) Fine grain artifact metadata. Here you can find granular information of your container image (by layer/tag) including temporal CVE scans and the ability to recall an image. 
![](/python/static/00_cve.png)