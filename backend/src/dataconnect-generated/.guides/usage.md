# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createNodeGroup, listTaskDefinitions, createTaskExecution, listNodes } from '@dataconnect/generated';


// Operation CreateNodeGroup:  For variables, look at type CreateNodeGroupVars in ../index.d.ts
const { data } = await CreateNodeGroup(dataConnect, createNodeGroupVars);

// Operation ListTaskDefinitions: 
const { data } = await ListTaskDefinitions(dataConnect);

// Operation CreateTaskExecution:  For variables, look at type CreateTaskExecutionVars in ../index.d.ts
const { data } = await CreateTaskExecution(dataConnect, createTaskExecutionVars);

// Operation ListNodes: 
const { data } = await ListNodes(dataConnect);


```