package com.tarea4.tarea4.services;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.tarea4.tarea4.models.Actividad;
import com.tarea4.tarea4.models.ActividadRepository;
import com.tarea4.tarea4.models.ActividadTema;
import com.tarea4.tarea4.models.ActividadTemaRepository;
import com.tarea4.tarea4.models.Nota;
import com.tarea4.tarea4.models.NotaRepository;

@Service
public class AppService {

    private final String pathStatic;
    private final ActividadRepository actividadRepository;
    private final ActividadTemaRepository actividadTemaRepository;
    private final NotaRepository notaRepository;

    public AppService(ActividadRepository actividadRepository, ActividadTemaRepository actividadTemaRepository, NotaRepository notaRepository) throws IOException {
        this.actividadRepository = actividadRepository;
        this.actividadTemaRepository = actividadTemaRepository;
        this.notaRepository = notaRepository;
        // Dynamically resolve the absolute path for the static directory
        Path staticDir = Paths.get(ResourceUtils.getFile("classpath:static").getAbsolutePath());
        this.pathStatic = staticDir.toString();
        System.out.println("Static path resolved to: " + this.pathStatic);
    }

    public List<Map<String, String>> getActividadesData(Integer pageSize) {
        List<Actividad> actividades = actividadRepository.findAllByOrderByIdDesc(PageRequest.of(0, pageSize)).getContent();
        List<Map<String, String>> actividadData = new ArrayList<>();
        List<ActividadTema> actividadesTema = actividadTemaRepository.findAllByOrderByIdDesc(PageRequest.of(0, pageSize)).getContent();
        List<Nota> notas = notaRepository.findAllByOrderByIdDesc(PageRequest.of(0, pageSize)).getContent();
        
        for (int i = 0; i < actividades.size(); i++) {
            Map<String, String> actData = new HashMap<>();
            Actividad act = actividades.get(i);
        
            actData.put("id", act.getId().toString());
            actData.put("fecha_inicio", act.getFechaInicio().toString());
            actData.put("sector", act.getSector());
            actData.put("nombre", act.getNombre());
        
            if (i < actividadesTema.size()) {
                ActividadTema tema = actividadesTema.get(i);
                actData.put("tema", tema.getTema()); 
            } else {
                actData.put("tema", "N/A"); 
            }
        
            float sum = 0f;
            int count = 0;
        
            for (Nota nota : notas) {
                if (nota.getActividadId() == act.getId()) {
                    sum += nota.getNota();
                    count++;
                }
            }
        
            if (count > 0) {
                float average = sum / count;
                actData.put("nota", String.format("%.2f", average));
            } else {
                actData.put("nota", "-");
            }
            
        
            actividadData.add(actData);
        }
        
        return actividadData;
    }

    public void handlePostRequest(
        LocalDateTime fecha_inicio,
        String sector,
        String nombre,
        String tema,
        String nota) throws Exception {

            // Save the confession in the database
            Actividad actividad = new Actividad(
                fecha_inicio,
                sector,
                nombre
            );
            actividadRepository.save(actividad);
            System.out.println("Confession saved successfully.");
    }

    public void handleNotaPostRequest(
        Long actividad_id,
        float nota) throws Exception {

            Nota notaObj = new Nota(
                actividad_id,
                nota
            );
            notaRepository.save(notaObj);
            System.out.println("Nota saved successfully.");
    }
}
