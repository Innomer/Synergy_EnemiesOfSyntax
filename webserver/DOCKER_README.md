## PDFTRON Server Readme

For more info, check our documentation at https://www.pdftron.com/documentation/web/guides/wv-server/ 

#### Requirements

Windows 10, Windows Server 2016, or a Linux distribution.
A connection to the internet.

It is possible to run this sample with other versions of Windows if you are able to install Docker.

#### Installing Docker

Contained in this package is a series of configuration files to run the WebViewer Server. To use this image, first install
docker at:

    https://docs.docker.com/engine/installation/
    
### STARTING THE SAMPLE WITH DEFAULTS

Open a command line, navigate to this directory and call:

    docker-compose up

To start the container in detached mode, so that it is not tied to the terminal call this:

   docker-compose up -d

To start container fresh, instead of using an existing one, call:

   docker-compose up -d --force-recreate

You can now access the demo app on http://localhost:8090/demo/?s

#### Accessing the demo

To access the demo, navigate to http://localhost:8090/demo?s

#### Restarting the containers

     docker-compose restart

#### Stopping the container

    docker-compose down

The webviewer-sample line can also be replaced with the container id.

#### VIEW THE LOGS

    docker-compose logs : shows all the logs
    docker-compose logs -f : shows all the logs, and continues following them

#### Attaching to the running container

If you wish to see inside of the running docker container and perform actions on it while it runs, do the following:

    docker-compose exec pdfd-tomcat bash

You should now have access to the running docker container.

#### SSL Config

The WebViewer server comes with a self-signed certificate, usable for debugging purposes only.

In order to have it work correctly on your own domain you must provide a signed certificate file. This signed certificate file should contain within it a public certificate, an optional intermediary certificate and a private key in the pem format. The private key must not have an associated password. If you do not include an intermediary certificate in this file, there may be issues with SSL on Firefox.

This combined certificate file should be located within `haproxy_ssl/` with the name `combined_key.pem`.

#### Including self signed certs

To include any self signed certs for your network in the docker image, add them to an external folder and mount that folder
as a volume on the pdfd-tomcat containers at the path /certs. The example below has external_certs as the external folder.

volumes:
     - ./external_certs:/certs

#### Starting WebViewer

Once the docker container is up-and-running, then it can be used by supplying the `pdftronServer` argument to WebViewer upon startup:

```
options.webViewerServerUrl = 'http://<docker_address>'
var myWebViewer = new PDFTron.WebViewer(options, viewerElement);
```

#### Loading documents

When a document URL is provided, that URL will now be fetched by the docker server instead of the browser.
If authorization information needs to be provided to the server providing the document, this can be done using the `customHeaders` option when creating a document.

You can also provide the `filename` option to ensure that the server knows what type of file you are attempting to view (in case it is not clear from the URL).

```
options.customHeaders = {Cookie: "MYAUTHTOKEN=BF6CF50AB90C4025"};
options.filename = "Document.pdf";
var url = 'http://<documentserver>/FileDownload?param1=abcd&fetchid=dcba';
myWebViewer.loadDocument(url, options);
```

When the docker server makes a request to fetch `http://<documentserver>/FileDownload?param1=abcd&fetchid=dcba`, the http request will include the values in `options.customHeaders`.

#### Multiple backends

The container (along with webviewer) now has built-in support for using multiple backends behind a load balancer. 

As the container is not entirely stateless, the balancer needs to fulfill a few requirements:

- operates at layer 7 (http)
- supports instance affinity ("stickiness") via cookies.
- supports http health checks at a specific path

There is a sample configuration included in the download archive which demonstrates a fully working load balancer setup. Running `docker-compose -f docker-compose_load_balance.yml up` will launch a container composed of two pdftron server nodes with an [HAProxy](http://www.haproxy.org/ "HAProxy")  load balancer front end.

In the sample setup, incoming connections are directed to the least occupied backend node, and will remain attached to that node for the remainder of the session, or until the node starts to become overloaded.

If there are no available healthy nodes, then webviewer will attempt to continue in client-only rendering mode.

#### Preloading documents

To pre-fetch a document onto the PDFTron server use the 
`http://<docker_address>/blackbox/PreloadURL` entry point, with the `url` query parameter. For example, to pre-fetch `http://domain/document.pdf`, make a GET request to `http://<docker_address>/blackbox/PreloadURL?url=http%3A%2F%2Fdomain%2Fdocument.pdf`

#### Server options

For a full listing of server options please visit this [documentation](https://www.pdftron.com/documentation/web/guides/wv-server-config/)
