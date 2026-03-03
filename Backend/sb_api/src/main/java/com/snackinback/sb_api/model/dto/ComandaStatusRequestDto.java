package com.snackinback.sb_api.model.dto;

import com.snackinback.sb_api.model.enums.ComandaStatusEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComandaStatusRequestDto {

    private ComandaStatusEnum status;
}
