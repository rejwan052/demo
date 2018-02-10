<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html lang="en">
<body>

<form:form action="/product/${id}" modelAttribute="product">
	<input type="hidden" name="_method" value="put">
	<table>
		<tr>
			<td>Product ID:</td>
			<td>${product.getId()}</td>
		</tr>
		<tr>
			<td>Product Name:</td>
			<td><form:input path="name"/></td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="submit" value="Save"/>
			</td>
		</tr>
	</table>
</form:form>

</body>
</html>
