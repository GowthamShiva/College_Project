package com.example.ff1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/myservices")
public class MyServicesController {

    @Autowired
    private MyServicesService myServicesService;

    // Create a new MyService
    @PostMapping
    public ResponseEntity<MyServices> createMyService(
            @RequestParam String title,
            @RequestParam Double price,
            @RequestParam(required = false) MultipartFile coverImage
    ) throws IOException {
        MyServices myServices = new MyServices();
        myServices.setTitle(title);
        myServices.setPrice(price);

        if (coverImage != null && !coverImage.isEmpty()) {
            myServices.setCoverImage(coverImage.getBytes());
        }

        return ResponseEntity.ok(myServicesService.saveMyService(myServices));
    }

    // Get all MyServices
    @GetMapping
    public ResponseEntity<List<MyServices>> getAllMyServices() {
        return ResponseEntity.ok(myServicesService.getAllMyServices());
    }

    // Get a MyService by ID
    @GetMapping("/{id}")
    public ResponseEntity<MyServices> getMyServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(myServicesService.getMyServiceById(id));
    }

    // Delete a MyService by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMyService(@PathVariable Long id) {
        myServicesService.deleteMyService(id);
        return ResponseEntity.noContent().build();
    }
}
