package com.tarea4.tarea4.controllers;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tarea4.tarea4.services.AppService;

@Controller
public class AppController {
    private final AppService appService;
    public AppController(AppService appService) {
        this.appService = appService;
    }
    
    @GetMapping("/")
    public String indexRoute(Model model) {
        List<Map<String, String>> modelData = appService.getActividadesData(3);
        model.addAttribute("data", modelData);
        return "index";
    }
    @PostMapping("/post_nota")
    public String indexPostRoute(
        @RequestParam("actividadId") Long actividadId,
        @RequestParam("nota") float nota) throws Exception {
        appService.handleNotaPostRequest(actividadId, nota);
        return "redirect:/";
    }
    @GetMapping("/stats")
    public String statsRoute() {
        return "stats";
    }

    @GetMapping("/map")
    public String mapRoute() {
        return "map";
    }

}
