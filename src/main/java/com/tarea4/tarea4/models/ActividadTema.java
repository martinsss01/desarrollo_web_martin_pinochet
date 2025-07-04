package com.tarea4.tarea4.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table
public class ActividadTema {

    @Id
    @SequenceGenerator(
        name = "actividad_tema__sequence",
        sequenceName = "actividad_tema_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "actividad_tema_sequence"
    )
    private Long id;

    @NotNull
    private String tema;

    private String glosa_otro;
    
    @NotNull
    @ManyToOne
    @JoinColumn(name = "actividad_id")
    private Actividad actividad;
    

 
    public ActividadTema() {
    }

    public ActividadTema(String tema, 
                    String glosa_otro){
        this.tema = tema;
        this.glosa_otro = glosa_otro;
    }

    public Long getId() {
        return id;
    }

    public String getGlosaOtro() {
        return glosa_otro;
    }

    public String getTema(){
        return tema;
    }
}
 