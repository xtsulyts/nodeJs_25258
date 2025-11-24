# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListTaskDefinitions*](#listtaskdefinitions)
  - [*ListNodes*](#listnodes)
- [**Mutations**](#mutations)
  - [*CreateNodeGroup*](#createnodegroup)
  - [*CreateTaskExecution*](#createtaskexecution)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListTaskDefinitions
You can execute the `ListTaskDefinitions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTaskDefinitions(): QueryPromise<ListTaskDefinitionsData, undefined>;

interface ListTaskDefinitionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTaskDefinitionsData, undefined>;
}
export const listTaskDefinitionsRef: ListTaskDefinitionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTaskDefinitions(dc: DataConnect): QueryPromise<ListTaskDefinitionsData, undefined>;

interface ListTaskDefinitionsRef {
  ...
  (dc: DataConnect): QueryRef<ListTaskDefinitionsData, undefined>;
}
export const listTaskDefinitionsRef: ListTaskDefinitionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTaskDefinitionsRef:
```typescript
const name = listTaskDefinitionsRef.operationName;
console.log(name);
```

### Variables
The `ListTaskDefinitions` query has no variables.
### Return Type
Recall that executing the `ListTaskDefinitions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTaskDefinitionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTaskDefinitionsData {
  taskDefinitions: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    command: string;
    scheduleType: string;
    cronSchedule?: string | null;
    retryAttempts?: number | null;
    timeoutSeconds?: number | null;
  } & TaskDefinition_Key)[];
}
```
### Using `ListTaskDefinitions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTaskDefinitions } from '@dataconnect/generated';


// Call the `listTaskDefinitions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTaskDefinitions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTaskDefinitions(dataConnect);

console.log(data.taskDefinitions);

// Or, you can use the `Promise` API.
listTaskDefinitions().then((response) => {
  const data = response.data;
  console.log(data.taskDefinitions);
});
```

### Using `ListTaskDefinitions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTaskDefinitionsRef } from '@dataconnect/generated';


// Call the `listTaskDefinitionsRef()` function to get a reference to the query.
const ref = listTaskDefinitionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTaskDefinitionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.taskDefinitions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.taskDefinitions);
});
```

## ListNodes
You can execute the `ListNodes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listNodes(): QueryPromise<ListNodesData, undefined>;

interface ListNodesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListNodesData, undefined>;
}
export const listNodesRef: ListNodesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listNodes(dc: DataConnect): QueryPromise<ListNodesData, undefined>;

interface ListNodesRef {
  ...
  (dc: DataConnect): QueryRef<ListNodesData, undefined>;
}
export const listNodesRef: ListNodesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listNodesRef:
```typescript
const name = listNodesRef.operationName;
console.log(name);
```

### Variables
The `ListNodes` query has no variables.
### Return Type
Recall that executing the `ListNodes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListNodesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListNodesData {
  nodes: ({
    id: UUIDString;
    name: string;
    ipAddress: string;
    location?: string | null;
    status: string;
    lastHeartbeat: TimestampString;
    description?: string | null;
  } & Node_Key)[];
}
```
### Using `ListNodes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listNodes } from '@dataconnect/generated';


// Call the `listNodes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listNodes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listNodes(dataConnect);

console.log(data.nodes);

// Or, you can use the `Promise` API.
listNodes().then((response) => {
  const data = response.data;
  console.log(data.nodes);
});
```

### Using `ListNodes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listNodesRef } from '@dataconnect/generated';


// Call the `listNodesRef()` function to get a reference to the query.
const ref = listNodesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listNodesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.nodes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.nodes);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNodeGroup
You can execute the `CreateNodeGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNodeGroup(vars: CreateNodeGroupVariables): MutationPromise<CreateNodeGroupData, CreateNodeGroupVariables>;

interface CreateNodeGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNodeGroupVariables): MutationRef<CreateNodeGroupData, CreateNodeGroupVariables>;
}
export const createNodeGroupRef: CreateNodeGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNodeGroup(dc: DataConnect, vars: CreateNodeGroupVariables): MutationPromise<CreateNodeGroupData, CreateNodeGroupVariables>;

interface CreateNodeGroupRef {
  ...
  (dc: DataConnect, vars: CreateNodeGroupVariables): MutationRef<CreateNodeGroupData, CreateNodeGroupVariables>;
}
export const createNodeGroupRef: CreateNodeGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNodeGroupRef:
```typescript
const name = createNodeGroupRef.operationName;
console.log(name);
```

### Variables
The `CreateNodeGroup` mutation requires an argument of type `CreateNodeGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNodeGroupVariables {
  name: string;
  description: string;
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateNodeGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNodeGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNodeGroupData {
  nodeGroup_insert: NodeGroup_Key;
}
```
### Using `CreateNodeGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNodeGroup, CreateNodeGroupVariables } from '@dataconnect/generated';

// The `CreateNodeGroup` mutation requires an argument of type `CreateNodeGroupVariables`:
const createNodeGroupVars: CreateNodeGroupVariables = {
  name: ..., 
  description: ..., 
  userId: ..., 
};

// Call the `createNodeGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNodeGroup(createNodeGroupVars);
// Variables can be defined inline as well.
const { data } = await createNodeGroup({ name: ..., description: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNodeGroup(dataConnect, createNodeGroupVars);

console.log(data.nodeGroup_insert);

// Or, you can use the `Promise` API.
createNodeGroup(createNodeGroupVars).then((response) => {
  const data = response.data;
  console.log(data.nodeGroup_insert);
});
```

### Using `CreateNodeGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNodeGroupRef, CreateNodeGroupVariables } from '@dataconnect/generated';

// The `CreateNodeGroup` mutation requires an argument of type `CreateNodeGroupVariables`:
const createNodeGroupVars: CreateNodeGroupVariables = {
  name: ..., 
  description: ..., 
  userId: ..., 
};

// Call the `createNodeGroupRef()` function to get a reference to the mutation.
const ref = createNodeGroupRef(createNodeGroupVars);
// Variables can be defined inline as well.
const ref = createNodeGroupRef({ name: ..., description: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNodeGroupRef(dataConnect, createNodeGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.nodeGroup_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.nodeGroup_insert);
});
```

## CreateTaskExecution
You can execute the `CreateTaskExecution` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTaskExecution(vars: CreateTaskExecutionVariables): MutationPromise<CreateTaskExecutionData, CreateTaskExecutionVariables>;

interface CreateTaskExecutionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTaskExecutionVariables): MutationRef<CreateTaskExecutionData, CreateTaskExecutionVariables>;
}
export const createTaskExecutionRef: CreateTaskExecutionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTaskExecution(dc: DataConnect, vars: CreateTaskExecutionVariables): MutationPromise<CreateTaskExecutionData, CreateTaskExecutionVariables>;

interface CreateTaskExecutionRef {
  ...
  (dc: DataConnect, vars: CreateTaskExecutionVariables): MutationRef<CreateTaskExecutionData, CreateTaskExecutionVariables>;
}
export const createTaskExecutionRef: CreateTaskExecutionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTaskExecutionRef:
```typescript
const name = createTaskExecutionRef.operationName;
console.log(name);
```

### Variables
The `CreateTaskExecution` mutation requires an argument of type `CreateTaskExecutionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTaskExecutionVariables {
  nodeId: UUIDString;
  taskDefinitionId: UUIDString;
  executionId: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `CreateTaskExecution` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTaskExecutionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTaskExecutionData {
  taskExecution_insert: TaskExecution_Key;
}
```
### Using `CreateTaskExecution`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTaskExecution, CreateTaskExecutionVariables } from '@dataconnect/generated';

// The `CreateTaskExecution` mutation requires an argument of type `CreateTaskExecutionVariables`:
const createTaskExecutionVars: CreateTaskExecutionVariables = {
  nodeId: ..., 
  taskDefinitionId: ..., 
  executionId: ..., 
  status: ..., 
};

// Call the `createTaskExecution()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTaskExecution(createTaskExecutionVars);
// Variables can be defined inline as well.
const { data } = await createTaskExecution({ nodeId: ..., taskDefinitionId: ..., executionId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTaskExecution(dataConnect, createTaskExecutionVars);

console.log(data.taskExecution_insert);

// Or, you can use the `Promise` API.
createTaskExecution(createTaskExecutionVars).then((response) => {
  const data = response.data;
  console.log(data.taskExecution_insert);
});
```

### Using `CreateTaskExecution`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTaskExecutionRef, CreateTaskExecutionVariables } from '@dataconnect/generated';

// The `CreateTaskExecution` mutation requires an argument of type `CreateTaskExecutionVariables`:
const createTaskExecutionVars: CreateTaskExecutionVariables = {
  nodeId: ..., 
  taskDefinitionId: ..., 
  executionId: ..., 
  status: ..., 
};

// Call the `createTaskExecutionRef()` function to get a reference to the mutation.
const ref = createTaskExecutionRef(createTaskExecutionVars);
// Variables can be defined inline as well.
const ref = createTaskExecutionRef({ nodeId: ..., taskDefinitionId: ..., executionId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTaskExecutionRef(dataConnect, createTaskExecutionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.taskExecution_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.taskExecution_insert);
});
```

