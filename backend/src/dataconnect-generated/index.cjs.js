const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'backend',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNodeGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNodeGroup', inputVars);
}
createNodeGroupRef.operationName = 'CreateNodeGroup';
exports.createNodeGroupRef = createNodeGroupRef;

exports.createNodeGroup = function createNodeGroup(dcOrVars, vars) {
  return executeMutation(createNodeGroupRef(dcOrVars, vars));
};

const listTaskDefinitionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTaskDefinitions');
}
listTaskDefinitionsRef.operationName = 'ListTaskDefinitions';
exports.listTaskDefinitionsRef = listTaskDefinitionsRef;

exports.listTaskDefinitions = function listTaskDefinitions(dc) {
  return executeQuery(listTaskDefinitionsRef(dc));
};

const createTaskExecutionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTaskExecution', inputVars);
}
createTaskExecutionRef.operationName = 'CreateTaskExecution';
exports.createTaskExecutionRef = createTaskExecutionRef;

exports.createTaskExecution = function createTaskExecution(dcOrVars, vars) {
  return executeMutation(createTaskExecutionRef(dcOrVars, vars));
};

const listNodesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListNodes');
}
listNodesRef.operationName = 'ListNodes';
exports.listNodesRef = listNodesRef;

exports.listNodes = function listNodes(dc) {
  return executeQuery(listNodesRef(dc));
};
