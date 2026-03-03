package com.snackinback.sb_api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemUpdateRequestDto {

    private String observacao;
    private Integer quantidade;

}
