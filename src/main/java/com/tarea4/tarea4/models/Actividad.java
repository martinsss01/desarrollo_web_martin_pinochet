package com.tarea4.tarea4.models;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table
public class Actividad {

    @Id
    @SequenceGenerator(
        name = "activity_sequence",
        sequenceName = "activity_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "activity_sequence"
    )
    private Long id;

    @NotNull
    private LocalDateTime dia_hora_inicio;

    @NotNull
    private String sector;
    
    @NotNull
    private String nombre;
 
    public Actividad() {
    }

    public Actividad(LocalDateTime dia_hora_inicio, 
                    String sector,
                    String nombre){

        this.dia_hora_inicio = dia_hora_inicio;
        this.sector = sector;
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getFechaInicio() {
        return dia_hora_inicio;
    }

    public String getSector() {
        return sector;
    }

    public String getNombre() {
        return nombre;
    }

    public static Boolean validateConfession(String confText, MultipartFile confImg) {
        // Ejercicio: implementar validacion de confesiones :)
        return true;
    }
}
 