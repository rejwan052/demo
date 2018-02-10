<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html lang="en">
<head>
	<style>
		.del-product {
			margin-bottom: 0;
		}
	</style>
</head>
<body>

<div>
	<a href="/product/new">Create Product</a>
</div>

<div>
	<form:form action="/product" method="get" modelAttribute="productQuery">
		<fieldset>
			<legend>Product</legend>
			<form:label path="name">Name:</form:label><form:input path="name" />
		</fieldset>
		<fieldset>
			<legend>Model</legend>
			<form:radiobuttons path="model" itemValue="id" itemLabel="name" items="${allModels}" />
		</fieldset>
		<fieldset>
			<legend>Type</legend>
			<form:checkboxes path="type"  itemValue="id" itemLabel="name" items="${allTypes}" />
		</fieldset>
		<fieldset>
			<legend>Warehouse</legend>
			<form:select path="warehouse">
				<form:options itemValue="id" itemLabel="name" items="${allWarehouses}" />
			</form:select>
		</fieldset>

		<input type="submit">
	</form:form>
</div>

<table>
	<thead>
	<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Model</th>
		<th>Type</th>
		<th>Warehouse</th>
		<th>Edit</th>
		<th>Delete</th>
	</tr>
	</thead>
	<tboty>
		<c:forEach var="product" items="${products}">
			<tr>
				<td>${product.getId()}</td>
				<td><a href="/product/${product.getId()}">${product.getName()}</a></td>
				<td>${product.getModel().getName()}</td>
				<td>${product.getType().getName()}</td>
				<td>${product.getWarehouse().getName()}</td>
				<td><a href="/product/${product.getId()}/edit">Edit</a></td>
				<td>
					<form id="del-${product.getId()}" method="post" action="/product/${product.getId()}" class="del-product">
						<input type="hidden" name="_method" value="delete">
						<a href="#" onclick="document.forms['del-${product.getId()}'].submit(); return false;">Del</a>
					</form>
				</td>
			</tr>
		</c:forEach>
	</tboty>
</table>

</body>
</html>
