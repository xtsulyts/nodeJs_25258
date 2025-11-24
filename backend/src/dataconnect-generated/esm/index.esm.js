import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'backend',
  location: 'us-east4'
};

export const createNodeGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNodeGroup', inputVars);
}
createNodeGroupRef.operationName = 'CreateNodeGroup';

export function createNodeGroup(dcOrVars, vars) {
  return executeMutation(createNodeGroupRef(dcOrVars, vars));
}

export const listTaskDefinitionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTaskDefinitions');
}
listTaskDefinitionsRef.operationName = 'ListTaskDefinitions';

export function listTaskDefinitions(dc) {
  return executeQuery(listTaskDefinitionsRef(dc));
}

export const createTaskExecutionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTaskExecution', inputVars);
}
createTaskExecutionRef.operationName = 'CreateTaskExecution';

export function createTaskExecution(dcOrVars, vars) {
  return executeMutation(createTaskExecutionRef(dcOrVars, vars));
}

export const listNodesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListNodes');
}
listNodesRef.operationName = 'ListNodes';

export function listNodes(dc) {
  return executeQuery(listNodesRef(dc));
}

