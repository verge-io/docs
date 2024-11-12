---
status: new
---

# VergeOS vSAN Block-Level Architecture and Data Distribution

## Overview

VergeOS vSAN employs a sophisticated block-level architecture that forms the foundation of its distributed storage system. This architecture enables efficient data distribution, high availability, and optimal performance across the entire storage infrastructure.

## Related Documentation

- [Scale Out Guide](/implementation-guide/scale-out-nodes) - Detailed instructions for adding nodes to expand capacity
- [Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan) - Guide for increasing resources on existing nodes

## Block-Level Operations

### Data Block Management

- **Block Creation**:
    - VM disks are divided into multiple blocks
    - Each block is assigned a unique cryptographic hash
    - Block size is optimized for performance and efficiency
    - Metadata tracks block relationships and locations

### Hash-Based Distribution

- **Block Identification**:
    - Each data block receives a cryptographic hash value
    - Hash serves as a unique identifier for the block
    - Used for both location mapping and deduplication

- **Distribution Algorithm**:
    - Blocks are distributed based on hash values
    - Ensures even distribution across available nodes
    - Prevents hot spots in the storage system
    - Facilitates efficient data retrieval

## Data Distribution Architecture

### Primary Storage

- **Block Placement**:
    - Primary copy of each block stored on optimal node
    - Placement determined by hash-based algorithm
    - Considers storage tier requirements
    - Optimizes for performance and capacity

### Primary Storage

- **Access Patterns**:
    - Reads prioritize single-copy access for efficiency
    - System defaults to reading from primary copy
    - Automatically reads from redundant copy if primary is slow/unresponsive
    - Optimizes by reading from local redundant copy when on same node
    - Write operations always update both primary and redundant copies
    - Automatic redistribution as needed

### Data Access

- **Read Operations**:
    - Quick block location lookup via hash
    - Intelligent source selection:
        - Prioritizes primary copy
        - Uses local redundant copy when on same node
        - Fails over to redundant copy if primary is unresponsive
    - Optimized for minimal network traffic
    - Performance optimization through locality awareness

- **Write Operations**:
    - New block hash generation
    - Simultaneous update of primary and redundant copies
    - Guaranteed write consistency across copies
    - Metadata updates
    - Consistency maintenance

### Redundant Storage

- **Redundancy Management**:
    - Secondary copies maintained for data protection
    - Distribution across different nodes
    - Automatic synchronization of copies
    - Configurable redundancy levels

- **Failover Handling**:
    - Automatic failover to redundant copies
    - Transparent to applications and VMs
    - Immediate availability during node failures
    - Self-healing capabilities

## Hash Map Functionality

### Core Components

- **Hash Map Structure**:
    - Maps block hashes to physical locations
    - Maintains block metadata
    - Tracks redundant copies
    - Handles version control

- **Location Tracking**:
    - Real-time block location updates
    - Efficient lookup mechanisms
    - Optimized for large-scale systems
    - Supports dynamic redistribution

## Cross-Node Distribution

### Distribution Mechanics

- **Node Management**:
    - Dynamic node addition and removal
    - Automatic rebalancing
    - Workload distribution
    - Resource optimization

- **Data Flow**:
    - Inter-node communication protocols
    - Efficient data transfer
    - Bandwidth optimization
    - Latency management

## Performance Optimization

### Data Access Optimization

- **Caching**:
    - Block-level cache management
    - Frequently accessed data optimization
    - Cache coherency maintenance
    - Performance acceleration

- **I/O Path**:
    - Optimized read/write paths
    - Minimal hop routing
    - Direct block access
    - Reduced latency

### Efficiency Features

- **Deduplication**:
    - Block-level deduplication
    - Hash-based identification
    - Space efficiency
    - Performance impact management

- **Compression**:
    - Inline compression
    - Algorithm optimization
    - Resource efficiency
    - Space savings

## System Resilience

### Fault Tolerance

- **Node Failures**:
    - Automatic failure detection
    - Immediate failover
    - Data accessibility maintenance
    - Recovery initiation

- **Network Issues**:
    - Path redundancy
    - Alternative route selection
    - Communication reliability
    - Performance maintenance

### Data Integrity

- **Block Validation**:
    - Continuous integrity checking
    - Hash validation
    - Corruption detection
    - Automatic repair initiation

- **Consistency Maintenance**:
    - Transaction consistency
    - Data coherency
    - Version control
    - Synchronization management

## Scaling Considerations

### Horizontal Scaling (Scaling Out)

- **Node Addition**:
    - Seamless integration of new nodes
    - Requires minimum of two nodes per cluster for redundancy
    - New nodes must match existing cluster configuration:
        - Processor type
        - Memory configuration
        - Physical disk drive configuration
    - Maintains N+1 redundancy for high availability
    - Automatic data redistribution
    - Performance optimization
    - Capacity expansion

- **Cluster Expansion**:
    - Linear scalability
    - Option to create new clusters if matching nodes unavailable
    - Each new cluster requires minimum of two matching nodes
    - Resource optimization
    - Performance maintenance
    - Balanced distribution

### Vertical Scaling (Scaling Up)

- **Resource Enhancement**:
    - Storage capacity increase:
        - Requires equal drive additions across all cluster nodes
        - Maintains balanced storage distribution
    - Memory expansion:
        - Requires maintenance mode before power off
        - Ensures graceful workload migration
    - Performance improvement
    - Capability expansion
    - Efficiency optimization

!!! note "Important"
    Consult with our [support](/support) team to determine the optimal expansion strategy for your specific environment.

---

## Architecture Diagram

### Understanding the Architecture Components

The diagram above illustrates the core components and data flow of the VergeOS vSAN architecture:

#### VM and Data Blocks

- A VM (labeled "Server 1") with its disk file (server1_disk.raw) is shown
- The disk is divided into multiple blocks (Block 1 through Block n)
- Each block receives a cryptographic hash

#### Hash Map and Distribution

- The Hash Map component manages block distribution across the storage tier
- Two main sections are shown:
  - Primary storage blocks (gray)
  - Redundant storage blocks (orange)
- Each block entry contains:
  - Hash number
  - Tier assignment
  - Node location

#### Node Distribution

- Four nodes are shown (Node 1 through Node 4)
- Each node contains multiple hash blocks
- Block distribution is shown by dotted lines connecting:
  - Hash map entries to specific nodes
  - Primary copies (gray)
  - Redundant copies (orange)

This architecture enables:

- Efficient data distribution
- Built-in redundancy
- Quick data recovery
- Optimized performance
- Scalable storage management

![VergeOS vSAN Block Distribution Architecture](/assets/vsan_hash_map.png)

