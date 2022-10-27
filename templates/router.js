const {controllerName} = require({controllerPath});

app.get('/{modelName}/', {controllerName}.list);
app.get('/{modelName}/:id', {controllerName}.show);
app.get('/{modelName}/p/paginate', {controllerName}.paginate);
app.post('/{modelName}/', {controllerName}.create);
app.put('/{modelName}/:id', {controllerName}.update);
app.delete('/{modelName}/:id', {controllerName}.remove);
