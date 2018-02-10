<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!DOCTYPE html>

<html lang="en">
<body>

<sec:authentication property="principal.username" />

</body>
</html>
