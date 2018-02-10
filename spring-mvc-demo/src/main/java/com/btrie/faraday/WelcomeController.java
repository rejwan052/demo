package com.btrie.faraday;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Date;


@Controller
public class WelcomeController {

    @GetMapping("/")
    public String welcome(Model model) {
        model.addAttribute("time", new Date());
        model.addAttribute("message", "test");
        return "welcome";
    }

    @GetMapping("/login")
    public String showLogin() {
        return "login";
    }

    @PostMapping(value = "/login")
    public String doLogin(UserAccount userAccount) {
        System.out.println(userAccount);
        return "redirect:/";
    }
}
