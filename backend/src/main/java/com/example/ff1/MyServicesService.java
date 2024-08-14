package com.example.ff1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyServicesService {

    @Autowired
    private MyServicesRepository myServicesRepository;

    public MyServices saveMyService(MyServices myServices) {
        return myServicesRepository.save(myServices);
    }

    public List<MyServices> getAllMyServices() {
        return myServicesRepository.findAll();
    }

    public MyServices getMyServiceById(Long id) {
        return myServicesRepository.findById(id).orElse(null);
    }

    public void deleteMyService(Long id) {
        myServicesRepository.deleteById(id);
    }
}
