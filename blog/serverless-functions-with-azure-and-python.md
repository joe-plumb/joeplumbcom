---
title: Serverless functions with Azure and Python
description: All you need to know to get started with serverless programming on Azure with Python
date: 2020-08-25
tags:
  - tech
layout: layouts/post.njk
---
I've been working with Azure Functions since late last year - my first real opportunity to work with them came about during the [App Modernization with NoSQL Openhack](https://openhack.microsoft.com/), where some of the exercises required attendees (i.e. me!) to implement an [event sourcing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) in Azure. For so long before this point, I had been including them as a component in my architectures and systems design - how hard could they be?

### Getting Started
The main hurdle for me with getting started was understanding the concepts that make up the function, and the boilerplate folder structure that comes out of the box when you initialize your project. Thankfully, one of the things it feels like there has been a great focus on with Azure Functions is the developer experience. Once I had my first couple of functions up and running, I began to find them incredibly intuitive. Conceptually, there are only 2 things you need to understand - triggers and bindings:

*Triggers* define what needs to happen in order to make your functions run. These could be events, requests, or a schedule. Each function has one trigger.

*Bindings* are connections - I think of them as the services I want to "glue" my function to. You can have input and output bindings, and these can be the same or different types of services. 

I find it helpful to focus on the *data movement required to solve my problem* - where does the data come from? Where does it need to go? What is the resulting action or output? From there, Inputs can be mapped into triggers (e.g. HTTP inputs) or bindings (e.g. fetch data from storage/a database), and similar for outputs (e.g. write the output to a datastore, return values over HTTP). Practical examples always help; let's take a look at building a function from scratch to understand these in more detail.

#### Prerequisites 
Before you get started, you'll need to make sure you've got a few tools installed. Firstly, you'll need a text editor - I recommend [Visual Studio Code](https://code.visualstudio.com/) as I find it quick to work with and it's got a great ecosystem of extensions. You'll want to install a couple of these, namely [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) and one for the programming language you are working with, in our case, [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python). You'll of course need Python installed (3.8, 3.7, and 3.6 are supported by Azure Functions). The final thing you'll need is [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Ccsharp%2Cbash#install-the-azure-functions-core-tools), which includes a version of the same runtime that powers Azure Functions, which enables you to run Functions in your development environment. 

With the above installed, you're all set!

#### Creating your first function
Start by creating a new directory, then open this in VS Code. When you're in your empty directory, open the command palette (`ctrl` + `shift` + `p`), then find and select _Azure Functions: Create Function_. You'll then have to answer a series of prompts about the new function. 

- Select a *language for your function project*: Choose Python.
- Select a *Python alias to create a virtual environment*: Choose the location of your Python interpreter. If the location isn't shown, type in the full path to your Python binary.
- Select a *template for your project's first function*: Choose HTTP trigger.
- Provide a *function name*: Leave this as HTTPTrigger1.
- *Authorization level*: Choose Anonymous, which enables anyone to call your function endpoint. You can find more information about [access keys for functions here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=python#authorization-keys).

You'll now see a bunch of files created in your once empty directory. To run the function locally, start debug mode in VS Code (Run > Start Debugging, or press F5), or type `func start` in your terminal. This will start the local emulator for Azure Functions and enable you to test your code. See the output of the function by heading to the given url in your browser:
```
http://localhost:7071/api/HTTPTrigger1?name=World
```
I find this functionality to be really useful - it allows me to iterate on my code as I go and quickly validate the function is working as expected. But where does the code go? And how do you add or change the triggers and bindings for the function? Many files are generated when you create the templates, but there are only a handful of files you need focus on to begin with.

#### The three files you need to know about
Demystifying the files that are automatically generated by the extension will help you get to outcomes faster. The three files you should focus on first are:
- `local.settings.json` - this is used by Azure Functions Core Tools to connect to _other services in Azure_ when you're running your functions project locally.
- `function.json` defines the triggers and bindings for your functions. These are very thoroughly documented in the [triggers and bindings reference](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob), and you can often re-use code from here with minimal changes. Notice that `$return` is [referenced in the output](https://github.com/joe-plumb/functions-demo/blob/main/HttpTrigger1/function.json#L17) - this is the return value of the `main` function. Using this, you can pass the output of your function to the output binding.
- `__init__.py` is where your code lives. If you've added additional bindings on top of the starter code make sure to , [reference them in the `main` function](https://github.com/joe-plumb/functions-demo/blob/main/HttpTrigger2/__init__.py#L6), and you're away! 

#### Deploying your first function
When you're happy with your function, you're only a few steps away from deploying it to the cloud - the instructions below demonstrate how you can do this using the Azure Functions Extension in VS Code.

1. Choose the Azure icon in the Activity bar, then in the Azure: Functions area, choose the Deploy to function app... button.
<img class="img-fluid" src="/img/1.png" alt="a screenshot of Visual Studio Code, with the Azure Functions extension and deploy to azure buttons highlighted">

2. As before, follow the prompts and provide the following information:
    - Select *subscription*: If prompted, select the subscription to use.
    - Select *Function App in Azure*: Choose `+ Create new Function App`, or an existing one if you already have a service provisioned (NB: Deploying to Azure Functions with the extension will replace any existing functions with those that you push)
    - Enter a *globally unique name for the function app*: Type a valid name into the URL path (the name you type will be validated to make sure that it's unique).
    - Select a *runtime*: Choose the same version of Python you've been working on locally.
    - Select a *location*: For better performance, choose a region near you.
3. The deployment will complete in the background - you can follow the progress by clicking the "Stream Logs" button on the prompt in VS Code. A notification will be displayed once the function app is created and deployed.
4. That's it! Your function is now deployed to Azure. You can see it in action by going to the function URL and passing parameters, just like we did with the local emulator, e.g.
```
http://$YOUR_FUNCTIONS_SERVICE_NAME.azurewebsites.net/api/HTTPTrigger1?name=World
```

There's a more comprehensive set of instructions (with more screenshots too) [available in the documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-python), if you'd like more details on any of the above steps.

### Taking it further
If you've got this far, you should be good to go! I've included some links and a summary of some other projects and repositories that might help you get started with your use case below. 

- *Event sourcing with Cosmos DB and the Change Feed* - As part of the Openhack that got me started, I pushed some starter functions for working with Cosmos DB to [this repo](https://github.com/joe-plumb/jp-azf-samples). Check this out if you're looking for some examples of getting data from [Event Hubs to Cosmos DB](https://github.com/joe-plumb/jp-azf-samples/tree/main/EventHubToCosmosDB), or working with the [Change](https://github.com/joe-plumb/jp-azf-samples/tree/main/CosmosChangeFeedTrigger) [Feed](https://github.com/joe-plumb/jp-azf-samples/tree/main/CosmosDocumentUpdateOnTrigger). 

- *Creating Serverless APIs to share data from Azure Blob* - After sharing this getting started content with my team, a colleague of mine asked whether Azure Functions would be a good fit to build a REST API for data sharing. Using a HTTP trigger and Azure Blob storage input binding, I was able to knock together [this example](https://github.com/joe-plumb/serverless-data-api). 

-  *End to end tutorial* - This post covers the basics, and should cover all you need to know to get started. If you want to go into more detail, there is a brilliant end to end [getting started tutorial in the documentation](https://docs.microsoft.com/en-us/azure/developer/python/tutorial-vs-code-serverless-python-01).

### On my to do list
One pattern I haven't yet had the opportunity to road test is the integration between [Azure Machine Learning and Azure Functions](https://docs.microsoft.com/en-us/azure/machine-learning/how-to-deploy-functions). I can see this being a really powerful pattern for peaky, unpredictable workloads, or for any applications where deploying to Kubernetes would add unnecessary complexity.

### Conclusion
In this post, I've covered how to get started with Azure Functions and Python, including some references to other useful material and some GitHub repositories for examples. Let me know if this was useful, good luck and happy building! 

\- Joe

_Has this helped you get up to speed with serverless? Have you deployed or do you want to know how to deploy ML models to the cloud using functions? [Contact me on Twitter](https://twitter.com/joe_plumb) if so, or if you have any questions or comments!_
