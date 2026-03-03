package com.streetbite.streetbite_api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemRequestDto {

    private Long comandaId;
    private Long produtoId;
    private String observacao;
    private Integer quantidade;
}
