package com.btrie.jsp;

public class UserAccount {
    private String username;
    private String password;


    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
    public String toString() {
        return "UserAccount{" +
                "name='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
