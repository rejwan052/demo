<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html lang="en">
<body>

<form:form action="/product" modelAttribute="product">
	<table>
		<tr>
			<td>Product Name:</td>
			<td><form:input path="name"/></td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="submit" value="Create"/>
			</td>
		</tr>
	</table>
</form:form>

</body>
</html>
