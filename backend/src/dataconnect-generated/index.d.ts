import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNodeGroupData {
  nodeGroup_insert: NodeGroup_Key;
}

export interface CreateNodeGroupVariables {
  name: string;
  description: string;
  userId: UUIDString;
}

export interface CreateTaskExecutionData {
  taskExecution_insert: TaskExecution_Key;
}

export interface CreateTaskExecutionVariables {
  nodeId: UUIDString;
  taskDefinitionId: UUIDString;
  executionId: UUIDString;
  status: string;
}

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

export interface NodeGroupMember_Key {
  nodeGroupId: UUIDString;
  nodeId: UUIDString;
  __typename?: 'NodeGroupMember_Key';
}

export interface NodeGroup_Key {
  id: UUIDString;
  __typename?: 'NodeGroup_Key';
}

export interface Node_Key {
  id: UUIDString;
  __typename?: 'Node_Key';
}

export interface TaskDefinition_Key {
  id: UUIDString;
  __typename?: 'TaskDefinition_Key';
}

export interface TaskExecution_Key {
  id: UUIDString;
  __typename?: 'TaskExecution_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNodeGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNodeGroupVariables): MutationRef<CreateNodeGroupData, CreateNodeGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNodeGroupVariables): MutationRef<CreateNodeGroupData, CreateNodeGroupVariables>;
  operationName: string;
}
export const createNodeGroupRef: CreateNodeGroupRef;

export function createNodeGroup(vars: CreateNodeGroupVariables): MutationPromise<CreateNodeGroupData, CreateNodeGroupVariables>;
export function createNodeGroup(dc: DataConnect, vars: CreateNodeGroupVariables): MutationPromise<CreateNodeGroupData, CreateNodeGroupVariables>;

interface ListTaskDefinitionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTaskDefinitionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTaskDefinitionsData, undefined>;
  operationName: string;
}
export const listTaskDefinitionsRef: ListTaskDefinitionsRef;

export function listTaskDefinitions(): QueryPromise<ListTaskDefinitionsData, undefined>;
export function listTaskDefinitions(dc: DataConnect): QueryPromise<ListTaskDefinitionsData, undefined>;

interface CreateTaskExecutionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTaskExecutionVariables): MutationRef<CreateTaskExecutionData, CreateTaskExecutionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTaskExecutionVariables): MutationRef<CreateTaskExecutionData, CreateTaskExecutionVariables>;
  operationName: string;
}
export const createTaskExecutionRef: CreateTaskExecutionRef;

export function createTaskExecution(vars: CreateTaskExecutionVariables): MutationPromise<CreateTaskExecutionData, CreateTaskExecutionVariables>;
export function createTaskExecution(dc: DataConnect, vars: CreateTaskExecutionVariables): MutationPromise<CreateTaskExecutionData, CreateTaskExecutionVariables>;

interface ListNodesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListNodesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListNodesData, undefined>;
  operationName: string;
}
export const listNodesRef: ListNodesRef;

export function listNodes(): QueryPromise<ListNodesData, undefined>;
export function listNodes(dc: DataConnect): QueryPromise<ListNodesData, undefined>;

