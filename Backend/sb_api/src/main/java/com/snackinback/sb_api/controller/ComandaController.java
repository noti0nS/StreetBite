package com.snackinback.sb_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snackinback.sb_api.model.dto.ComandaResponseDto;
import com.snackinback.sb_api.model.dto.ItemRequestDto;
import com.snackinback.sb_api.model.dto.ItemResponseDto;
import com.snackinback.sb_api.service.ComandaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/comandas")
@RequiredArgsConstructor
public class ComandaController {
    private final ComandaService comandaService;

    @PostMapping
    public void criarComanda(){
        comandaService.addComanda();
    }
    @GetMapping("/{id}")
    public ComandaResponseDto getById(@PathVariable Long id){
        return comandaService.getComandaById(id);
    }
    @GetMapping
    public List<ComandaResponseDto> getAllComandas(){
        return comandaService.listarTodasAsComandas();
    }
    @PatchMapping("/{id}")
    public void updateComanda(@PathVariable Long id, @RequestBody ComandaResponseDto request){
        comandaService.updateComanda(id, request);
    }
    @DeleteMapping("/{id}")
    public void deleteComandaById(@PathVariable Long id){
        comandaService.deleteComanda(id);
    }
    @PostMapping("/item")
    public void addItem(@RequestBody ItemRequestDto request){
        comandaService.addItem(request);
    }
    @GetMapping("/item/{id}")
    public ItemResponseDto getItemById(@PathVariable Long id){
        return comandaService.getItemById(id);
    }
    @GetMapping("/itens")
    public List<ItemResponseDto> getAllItens(){
        return comandaService.listarTodosOsItens();
    }
}

