<html lang="en">
<body>

<div>
	<a href="/product">Products</a>
</div>

<table>
	<thead>
	<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Model</th>
		<th>Type</th>
		<th>Warehouse</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>${product.getId()}</td>
		<td>${product.getName()}</td>
		<td>${product.getModel().getName()}</td>
		<td>${product.getType().getName()}</td>
		<td>${product.getWarehouse().getName()}</td>
	</tr>
	</tbody>
</table>

</body>
</html>
