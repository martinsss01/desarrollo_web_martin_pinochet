package com.tarea4.tarea4.models;


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
public class Nota {

    @Id
    @SequenceGenerator(
        name = "nota_sequence",
        sequenceName = "nota_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "nota_sequence"
    )
    private Long id;

    @NotNull
    private Long actividad_id;

    private float nota;

 
    public Nota() {
    }

    public Nota(long actividad_id, 
                float nota) {
        this.actividad_id = actividad_id;
        this.nota = nota;
    }

    public Long getId() {
        return id;
    }

    public long getActividadId() {
        return actividad_id;
    }
    public float getNota(){
        return nota;
    }

    public static Boolean validateConfession(String confText, MultipartFile confImg) {
        // Ejercicio: implementar validacion de confesiones :)
        return true;
    }
}
 