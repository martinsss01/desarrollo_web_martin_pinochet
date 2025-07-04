package com.tarea4.tarea4.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import org.springframework.stereotype.Service;

import com.tarea4.tarea4.models.Actividad;
import com.tarea4.tarea4.models.ActividadRepository;

@Service
public class ApiService {
    private final ActividadRepository actividadRepository;
    public ApiService(ActividadRepository actividadRepository) {
        this.actividadRepository = actividadRepository;
    }

    public List<Actividad> getActividades(String titleSubString) {
        List<Actividad> actividades = actividadRepository.findAll();
        List<Actividad> matchActividades = new ArrayList<Actividad>();
        for (Actividad act : actividades) {
            if (act.getNombre().toLowerCase().contains(titleSubString.toLowerCase())) {
                matchActividades.add(act);
            }
        }
        return matchActividades;
    }

    public List<Map<String, String>> getStatsData() {
        // Define the start and end date
        LocalDate startDate = LocalDate.of(2025, 3, 1);
        LocalDate endDate = LocalDate.of(2025, 7, 4);

        // Define the random number generator
        Random rand = new Random();

        // Generate the random data
        List<Map<String, String>> randomData = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            Map<String, String> data = new HashMap<>();
            data.put("date", getRandomDate(startDate, endDate, rand).toString());
            data.put("count", String.valueOf(getRandomInt(1, 10, rand)));
            randomData.add(data);
        }

        // Sort the data by date
        Collections.sort(randomData, (map1, map2) -> map1.get("date").compareTo(map2.get("date")));

        return randomData;
    }

    private static LocalDate getRandomDate(LocalDate startDate, LocalDate endDate, Random rand) {
        long totalDays = ChronoUnit.DAYS.between(startDate, endDate);
        long randomDays = rand.nextInt((int) totalDays + 1);
        return startDate.plusDays(randomDays);
    }

    private static int getRandomInt(int startInt, int endInt, Random rand) {
        return rand.nextInt(endInt - startInt + 1) + startInt;
    }


    
}
