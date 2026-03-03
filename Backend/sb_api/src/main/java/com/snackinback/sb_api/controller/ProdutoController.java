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

import com.snackinback.sb_api.model.Produto;
import com.snackinback.sb_api.service.ProdutoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @PostMapping
    public void adicionarItem(@RequestBody Produto request){
        produtoService.addProduto(request);
    }
    @GetMapping
    public List<Produto> listarItens(){
        return produtoService.listarTodosOsProdutos();
    }
    @GetMapping("/{id}")
    public Produto getProdutoById(@PathVariable Long id){
        return produtoService.getProdutoById(id);
    }
    @PatchMapping("/{id}")
    public void updateProduto(@PathVariable Long id, @RequestBody Produto request){
        produtoService.updateProduto(id, request);
    }
    @DeleteMapping("/{id}")
    public void deleteProduto (@PathVariable Long id){
        produtoService.deleteProduto(id);
    }
    
}
