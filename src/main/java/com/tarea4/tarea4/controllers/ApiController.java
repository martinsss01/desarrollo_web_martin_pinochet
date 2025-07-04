package com.tarea4.tarea4.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.tarea4.tarea4.services.ApiService;

import com.tarea4.tarea4.models.Actividad;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class ApiController {
    private final ApiService apiService;
    public ApiController(ApiService apiService) {
        this.apiService = apiService;

    }
    
    @GetMapping("/get-post")
    public Map<String, List<Actividad>> getActividadesEndpoint(@PathVariable("title_substring") String titleSubstring) {
        List<Actividad> actividades = apiService.getActividades(titleSubstring);
        return Map.of("data", actividades); // Encapsula la lista en un mapa con clave "data"
    }
    
    
}
