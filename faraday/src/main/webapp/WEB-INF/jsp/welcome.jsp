<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!DOCTYPE html>

<html lang="en">

<body>
<c:url value="/resources/text.txt" var="url"/>
<spring:url value="/resources/text.txt" htmlEscape="true" var="springUrl" />
Spring URL: ${springUrl} at ${time}
<br>
JSTL URL: ${url}
<br>
Message: ${message}

<sec:authorize access="!isAuthenticated()">
	<div>
		<a href="/login">Login</a>
	</div>
</sec:authorize>

<sec:authorize access="isAuthenticated()">
	<div>
		User: <sec:authentication property="principal.username" />
	</div
	<div>
		<form action="/logout">
			<button type="submit">Logout</button>
		</form>
	</div>
	<div>
		<ul>
			<li><a href="/user">User</a></li>
			<sec:authorize url="/admin">
				<li><a href="/admin">Admin</a></li>
			</sec:authorize>
		</ul>
	</div>
</sec:authorize>

</body>

</html>
